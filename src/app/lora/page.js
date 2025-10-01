// src/pages/lora.js

export default function LoRABlog() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Understanding LoRA: Low-Rank Adaptation for Efficient Fine-Tuning
      </h1>

      <p style={{ marginBottom: "1rem" }}>
        LoRA (Low-Rank Adaptation) is a parameter-efficient technique to fine-tune large language models.
        Instead of updating all weights of the model, LoRA introduces a pair of trainable low-rank matrices A and B.
      </p>

      <img src="/lora_diagram.png" alt="LoRA Diagram" style={{ maxWidth: "600px", marginBottom: "1rem" }} />

      <p>
        The idea is simple but powerful — during training, instead of updating the full weight matrix W,
        we freeze W and add a low-rank delta matrix (A × B).
      </p>
    </div>
  );
}
