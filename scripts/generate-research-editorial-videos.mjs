import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3";
const apiKey = process.env.ARK_API_KEY;
const model = process.env.SEEDANCE_MODEL_ID;
const outputDir = path.resolve("working-assets/research-video-drafts/generated");

if (!apiKey || !model) {
  throw new Error("ARK_API_KEY and SEEDANCE_MODEL_ID are required.");
}

process.stderr.write(
  "Internal previsualization only: generated clips are synthetic drafts and must not be published as research media.\n",
);

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const videos = [
  {
    name: "homepage-physical-world-synthesis",
    prompt: `Single continuous 5-second photorealistic editorial shot for a university Physical AI laboratory homepage. In a dark, refined scientific studio, a compact robot arm in the foreground slowly rotates toward a wall of eight large borderless displays. The displays show a synchronized collection of small physically plausible worlds in motion: wooden blocks toppling after a collision, a metal ball rolling down a ramp, liquid pouring into a glass, cloth folding over an object, a robot gripper making contact, and the same scenes represented as clean depth geometry and simulation. The moving events should feel like a coherent dataset for physical reasoning and scene synthesis, not random television footage. Camera: very slow lateral slider shot with layered depth, no cuts, balanced 16:9 composition, the robot arm and animated physical worlds both readable at small website-card size. Lighting: deep navy and graphite, muted cyan, subtle warm material highlights, mature academic mood. All robot geometry, objects, fluids, cloth, and screen content remain stable and physically credible. No readable text, no numbers, no charts, no equations, no logos, no watermark, no floating HUD, no generic AI brain, no cyberpunk neon, no human faces, no duplicated robot arms, no flicker. End with a composition close to the opening for a smooth loop.`,
  },
  {
    name: "fire-rescue-autonomy",
    prompt: `Single continuous 5-second photorealistic university robotics field-test shot inside a smoke-filled, partially damaged industrial corridor after a fire. A compact non-military four-wheel search-and-rescue robot with a lidar mast, thermal camera, and protective sensor housing advances slowly through shallow water, scattered concrete fragments, hanging cables, and drifting smoke. The robot pauses for one beat to scan through near-zero visibility, then chooses a safe route around debris and continues forward. Show physically accurate wheel contact, suspension movement, smoke turbulence, wet reflections, and restrained thermal-sensor glow. Camera: stable low three-quarter tracking shot at robot height, slow controlled movement, no cuts, robot fully visible. Lighting: dark graphite and warm distant emergency light with subtle PAIRS-style cool blue accents, credible academic documentary mood. No people, no victims, no flames touching the robot, no logos, no text, no subtitles, no watermark, no UI, no HUD, no military styling, no sci-fi city, no explosions, no duplicated parts, no deformed wheels, no dramatic shake. End with motion and framing close to the opening for a smooth loop.`,
  },
  {
    name: "human-multimodal-sensing",
    prompt: `Single continuous 5-second photorealistic university laboratory research shot about human-centered multimodal sensing. One adult participant in ordinary neutral clothing takes two natural steps and raises one hand while a compact mmWave radar unit and a small thermal camera on separate tripods observe from the side. A researcher remains softly out of focus behind a workstation, monitoring the experiment without interacting. Emphasize the participant's natural motion and the clearly visible non-RGB sensing devices; no robot is present. Camera: calm medium-wide lateral dolly, realistic parallax, stable framing, no cuts. Lighting: soft daylight, neutral white laboratory, muted cool blue and gentle warm skin tones, documentary scientific photography. Motion must be anatomically correct with stable identity, normal fingers and limbs, no temporal flicker. No skeleton overlay, no biometric UI, no surveillance mood, no logos, no text, no subtitles, no watermark, no holograms, no duplicate people. Finish with a neutral stance close to the opening composition for looping.`,
  },
  {
    name: "long-horizon-embodied-autonomy",
    prompt: `Single continuous 5-second photorealistic robotics demonstration in a realistic test apartment, visually distinct from an industrial workbench. A compact wheeled mobile manipulator with one mechanically plausible arm moves a short distance beside an open kitchen cabinet, picks up a lightweight cup from a tray mounted on its base, places the cup carefully onto a low cabinet shelf, then retracts the gripper. The shot should communicate a coherent multi-step task with navigation context, alignment, grasping, placement, and completion rather than one isolated grasp. Camera: fixed wide three-quarter view with a very subtle push-in, robot and cabinet always fully readable, no cuts. Lighting: soft residential daylight with restrained navy and cyan hardware accents. Show correct wheel motion, one arm only, believable joints, stable object geometry, accurate contact, no teleportation. No people, no logos, no text, no subtitles, no watermark, no HUD, no factory spectacle, no humanoid, no extra arms, no duplicated cup, no impossible grasp. End in a calm completed pose suitable for a short loop.`,
  },
  {
    name: "scalable-world-models",
    prompt: `Single continuous 5-second sophisticated scientific laboratory shot representing scalable Physical AI and learned world models. In the foreground, one real robot arm slowly moves a wooden block across a tabletop while a small mobile robot remains parked nearby. Behind them, a wall of large laboratory displays shows synchronized, visually coherent versions of the same scene: depth geometry, semantic regions, contact prediction, a rainy outdoor variant, and a clean physics simulation. The screen content updates smoothly in direct response to the real arm motion, making the connection between physical action and learned worlds clear without any words or diagrams. Camera: slow controlled sideways slider shot, layered depth, no cuts. Lighting: deep navy and graphite with muted cyan and small warm highlights, calm academic research atmosphere. All robotic geometry and screen motion must remain stable. No readable text, no equations, no logos, no watermark, no floating HUD, no humanoid, no generic AI brain, no cyberpunk neon, no duplicated arms, no random code, no flicker. End with a balanced composition close to the opening for looping.`,
  },
];

const requestedNames = process.argv.slice(2);
const selectedVideos = requestedNames.length
  ? videos.filter((video) => requestedNames.includes(video.name))
  : videos;

if (!selectedVideos.length || (requestedNames.length && selectedVideos.length !== new Set(requestedNames).size)) {
  throw new Error(`Unknown video name. Available: ${videos.map((video) => video.name).join(", ")}`);
}

async function requestJson(url, options = {}, retries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, attempt * 3000));
    }
  }
  throw lastError;
}

async function createTask(video) {
  const task = await requestJson(`${baseUrl}/contents/generations/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      content: [{ type: "text", text: video.prompt }],
      generate_audio: false,
      ratio: "16:9",
      duration: 5,
      resolution: "720p",
      watermark: false,
    }),
  });
  process.stdout.write(`created ${video.name}: ${task.id}\n`);
  return { ...video, id: task.id };
}

async function waitForTask(task) {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const result = await requestJson(`${baseUrl}/contents/generations/tasks/${task.id}`, { headers });
    process.stdout.write(`status ${task.name}: ${result.status}\n`);
    if (result.status === "failed") {
      throw new Error(`${task.name}: ${JSON.stringify(result.error || result)}`);
    }
    if (result.status === "succeeded") {
      const url =
        (!Array.isArray(result.content) && result.content?.video_url) ||
        result.output?.video_url;
      if (!url) throw new Error(`${task.name}: missing video URL`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${task.name}: download failed (${response.status})`);
      const file = path.join(outputDir, `${task.name}.mp4`);
      await writeFile(file, Buffer.from(await response.arrayBuffer()));
      process.stdout.write(`saved ${file}\n`);
      return file;
    }
  }
}

await mkdir(outputDir, { recursive: true });
const tasks = await Promise.all(selectedVideos.map(createTask));
const results = await Promise.allSettled(tasks.map(waitForTask));
const failures = results.filter((result) => result.status === "rejected");
if (failures.length) {
  failures.forEach((failure) => process.stderr.write(`${failure.reason}\n`));
  process.exitCode = 1;
}
