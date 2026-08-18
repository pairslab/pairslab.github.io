# Internal concept-motion draft prompts

These historical Seedance prompts are retained for internal previsualization only. Generated clips are drafts, not records of PAIRS Lab systems or experiments, and are not approved website media.

The helper script writes drafts to `working-assets/research-video-drafts/`, outside Hugo's published `static/` tree. Do not copy generated clips into `static/`, reference them from `data/research_media.yaml` or `data/research.yaml`, or present them as research results. The public site uses traceable figures and approved media from actual lab work.

For internal review, use one prompt per clip. Recommended output: `16:9`, `6-8 seconds`, `24 fps`, realistic motion, and a clean first/last frame for a seamless loop. Keep the clips silent and label them as synthetic drafts wherever they are shared.

## 01 — Open-world sensing

```text
Single continuous shot, 6 seconds, photorealistic university robotics field test. A compact non-military autonomous ground robot with four rugged wheels, a small lidar mast, stereo cameras, and no branding drives steadily along a muddy uneven forest service road in severe weather. Deep wet mud, water-filled ruts, slick rocks, fallen branches, and scattered low concrete obstacles block the path. Heavy rain falls diagonally under a strong crosswind; grass, bushes, and loose leaves bend visibly; dense low fog drifts across the background and reduces visibility. The robot stays fully operational: it steers around a fallen branch, climbs a shallow muddy ridge, passes a deep puddle, and maintains a stable heading without stopping. Show physically accurate wheel rotation, suspension movement, tire contact, small mud splashes, rain striking the chassis, and believable obstacle avoidance. Camera: calm low three-quarter tracking shot at robot height, smooth lateral movement, natural parallax, robot always fully in frame. Lighting: overcast daylight, blue-gray graphite palette, restrained cyan sensor reflections, mature academic research aesthetic. No people, no text, no subtitles, no logos, no watermark, no military styling, no sci-fi city, no HUD, no holograms, no jump cuts, no montage, no teleportation, no deformed wheels, no duplicated robot parts, no impossible acceleration, no dramatic camera shake. Keep the opening and ending compositions visually similar for a seamless loop.
```

## 02 — Human understanding

```text
A realistic research-lab video showing one researcher and a mobile robotic assistant sharing a workspace. The researcher reaches toward an object, pauses, changes direction, and the robot visibly adjusts its gaze and position to maintain a safe distance and prepare to help. Focus on body motion, hand intent, proxemics, and respectful collaboration rather than a product demonstration. Add only a very subtle cyan skeleton trace around the human joints and a few quiet motion vectors, perfectly aligned to the body and never covering the face. Camera movement: a calm medium-wide dolly from left to right with natural parallax. Lighting: soft window light mixed with cool laboratory fill, editorial and trustworthy. No logos, no text, no labels, no watermark, no exaggerated gestures, no sci-fi holograms, no duplicate limbs, no distorted hands, no unsafe contact. End with the researcher and robot returning to a neutral pose for a seamless loop.
```

## 03 — Long-horizon mobile manipulation

```text
A realistic, continuous research demonstration of a compact mobile manipulator completing a short sequence in a tidy laboratory: navigate around a workbench, align with a tray, grasp one small object, place it accurately, and recover smoothly after a tiny change in the object's position. The sequence should feel like one coherent long-horizon task with clear cause and effect, not a montage. Show the robot's base, arm, gripper, and sensors with mechanically accurate motion and believable contact. Add a very restrained cyan trajectory line near the floor and a small fading path behind the gripper; no large HUD or explanatory graphics. Camera movement: slow three-quarter follow shot, keeping the robot fully in frame. Mood: dependable physical intelligence, graphite, navy, brushed metal, soft cyan accents. No logos, no text, no labels, no watermark, no impossible grasping, no teleporting objects, no extra arms, no dramatic cinematic explosions, no fantasy environment. End near the starting position for looping.
```

## Shared negative prompt

```text
No text, no subtitles, no labels, no logos, no watermark, no UI panels, no fake paper titles, no invented metrics, no recognizable historical project demo, no RadarOcc references, no generic sci-fi city, no excessive neon, no glitch effects, no teleportation, no temporal flicker, no duplicated people or robot parts, no deformed hands, no unsafe human-robot contact.
```
