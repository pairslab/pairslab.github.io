# Homepage research media

The homepage has four research-media slots, one for each top-level research direction. Their public sources are configured in `data/research_media.yaml`.

The current edition uses figures from PAIRS Lab publications rather than synthetic concept videos:

1. Robust autonomy — GUIDE
2. Human sensing — M4Human
3. Embodied autonomy — PALM
4. Scalable Physical AI — Physion-Eval

## Public media policy

- Use a traceable figure, photograph, or video from an actual PAIRS Lab project.
- Prefer an existing asset in `static/images/featured-*` or `static/images/publications/` and describe what is visibly present in the alt text.
- Keep the four top-level slots aligned with the four entries in `data/research.yaml`; do not add a slot merely to fill space.
- Do not publish AI-generated concept media as evidence of a research system or experiment.

If an authentic lab demonstration is approved for publication, add its MP4 to a clearly named directory under `static/media/research/`, provide a representative still image as `poster`, and set `media_file` for the corresponding entry. Use a silent H.264 MP4, 16:9, 6–8 seconds, at 1280×720 or 1920×1080. Confirm participant consent, media ownership, and the accuracy of the accompanying text before committing it.

AI-generated motion drafts are internal previsualization only. The helper script writes them to `working-assets/research-video-drafts/`, which Hugo does not publish. Never reference those files from `data/research_media.yaml` or `data/research.yaml`.
