# Development notes

## Product work and implementation meet at the handoff

A useful incident flow has to make the next action understandable: what happened, where, which department is responsible and what is still open. I treat those questions as product requirements and use them to shape views, state and backend workflows.

## Separate interface state from remote outcomes

The private application uses repository boundaries, typed models and explicit workflow state. An uncertain network result is different from a confirmed failure; a screen should not imply that work was saved until the backend has confirmed it. The demo deliberately avoids remote writes.

## AI drafts need a review step

Voice reporting can reduce typing, but transcription and interpretation can be wrong. The implemented flow includes consent, structured draft validation and review before submission. This showcase exposes the interaction concept, not prompts, provider settings, evaluation data or private classification rules.

## Operational data before prediction

The analytics implementation aggregates recorded incident activity. Descriptive counts and trends should be distinguishable from predictions. Every number in the demo is derived from its tiny fictional dataset, not from hotel performance.

## Development with Codex

This showcase was prepared with Codex: inspecting source read-only, creating an independent demo, and reviewing the publication boundary. This states the provenance of this public artifact; it does not claim that every production feature was authored with AI or that AI involvement replaces engineering review.

## Why a static demo

A reviewer can open one HTML file, inspect the JavaScript and understand the concept without credentials or a build system. The tradeoff is intentional: no backend semantics, persistence, AI execution or native interaction fidelity. The visual is a new concept presentation, not a pixel-for-pixel reproduction of the app.

## Publication boundary

Only original showcase files and screenshots rendered from its synthetic data are included. No source files, production assets, migrations, environment configuration, private plans, customer material or production Git objects are imported. See [the publication review](publication-review.md).
