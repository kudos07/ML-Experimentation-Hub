export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#f9fafb",
        fontFamily: "Segoe UI, sans-serif",
        padding: "2rem 1.5rem",
        color: "#1a202c",
        lineHeight: "1.75",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      {/* Main Title */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Introduction to LoRA: Efficient Fine-Tuning of Large Language Models
      </h1>

      {/* Section Heading */}
      <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "1rem", color: "#2d3748" }}>
        1. Introduction
      </h2>

      {/* Flex layout: Text left, Image right */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Text block */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            As language models grow to billions of parameters, fine-tuning them becomes
            increasingly expensive in terms of memory, compute, and time. Researchers and
            engineers are constantly exploring new ways to adapt large models to downstream
            tasks with minimal overhead.
          </p>

          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            One promising technique is <strong>LoRA</strong> (Low-Rank Adaptation of Large Language Models).
            LoRA allows us to fine-tune models efficiently by freezing most of the original weights
            and injecting lightweight trainable parameters. This reduces memory usage and training time
            while maintaining or improving task performance.
          </p>

          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            In this article, we’ll break down:
          </p>

          <ul style={{ fontSize: "1.05rem", paddingLeft: "1.5rem" }}>
            <li>💡 Why traditional fine-tuning is inefficient</li>
            <li>🧠 How LoRA introduces low-rank updates</li>
            <li>⚙️ How it works during training</li>
            <li>🚀 Why it’s practical for production systems</li>
          </ul>
        </div>

        {/* Image block */}
        <div style={{ minWidth: "220px", maxWidth: "300px", flexShrink: 0 }}>
          <img
            src="/ML-Experimentation-Hub/images/lora-arch.png"
            alt="LoRA Diagram"
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              marginBottom: "0.5rem",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "#4a5568", textAlign: "center" }}>
            <em>Figure: LoRA injects low-rank matrices into frozen weight layers.</em>
          </p>
        </div>
      </div>

            {/* Section Heading */}
           <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        2. Problem Statement - Why not just fine-tune everything?
      </h2>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Text block */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            A natural idea is to take a pre-trained model and fine-tune all of its parameters
            on a new task. While this works in principle, it quickly becomes impractical as
            models scale to billions of weights.
          </p>

          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            During full fine-tuning, the model starts with pre-trained weights <em>Φ₀</em> and
            learns a new set of parameters <em>Φ₀ + ΔΦ</em> by maximizing the conditional
            likelihood of the training data:
          </p>

          <pre
            style={{
              backgroundColor: "#edf2f7",
              padding: "1rem",
              borderRadius: "8px",
              overflowX: "auto",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
{`max Φ  Σ(x,y)∈Z   Σ_t log PΦ(y_t | x, y_<t)`} 
          </pre>

          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            The challenge is that for each task we need to store a different set of parameters
            <em> ΔΦ </em>, which is just as large as the original model <em>Φ₀</em>. For something
            like GPT-3 with 175 billion parameters, this makes maintaining many fine-tuned copies
            extremely costly.
          </p>

          <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            This is where researchers began asking: can we represent the task-specific change
            <em> ΔΦ </em> more efficiently, without touching all the weights? That’s the idea behind
            LoRA.
          </p>
        </div>
      </div>

      {/* Section Heading */}
            {/* Section Heading */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        Key Definitions
      </h2>

      <div
        style={{
          backgroundColor: "#edf2f7",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <ul style={{ fontSize: "1.05rem", paddingLeft: "1.25rem", margin: 0, lineHeight: "1.75" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Full Fine-Tuning:</strong> Updating <em>all</em> model weights for a new task.
            Very effective, but costly for models with billions of parameters.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Adapters:</strong> Small extra layers inserted into a Transformer. Only these
            layers are trained, while the rest of the model is frozen. Efficient, but adds some
            inference latency since extra layers must be processed.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Prefix / Prompt Tuning:</strong> Adds trainable tokens or vectors to the model’s
            input. Lightweight and easy to store, but reduces usable sequence length and can be
            harder to optimize.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>LoRA (Low-Rank Adaptation):</strong> Freezes the original weights and learns a
            small low-rank update instead. Keeps inference speed the same and drastically reduces
            trainable parameters.
          </li>
          <li>
            <strong>Rank (r):</strong> Controls the size of LoRA’s low-rank matrices. A small r (like
            4 or 8) means far fewer parameters to train, yet still captures important task-specific
            changes.
          </li>
        </ul>
      </div>

           {/* Section Heading */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        3. How LoRA introduces low-rank updates
      </h2>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          Full fine-tuning means adjusting every weight in a giant model. LoRA avoids this by
          keeping the original weights frozen and only learning a small correction. Instead of a
          massive update, LoRA uses a pair of much smaller matrices whose product captures the
          same effect.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          Mathematically, if the original weight is <em>W₀</em>, LoRA writes the update as:
        </p>

        <pre
          style={{
            backgroundColor: "#edf2f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        >
{`W₀ + ΔW = W₀ + B A

where:
  B ∈ ℝ^(d×r)   (tall, skinny matrix)
  A ∈ ℝ^(r×k)   (short, wide matrix)
  r ≪ min(d, k)`}
        </pre>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          In the forward pass, the model computes:
        </p>

        <pre
          style={{
            backgroundColor: "#edf2f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        >
{`h = W₀x + ΔWx
  = W₀x + B A x`}
        </pre>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          To see why this helps, let’s use a toy example. Imagine a full update matrix of
          size 1000 × 1000. Training it directly would mean learning <strong>1,000,000</strong>
          parameters. With LoRA, we choose a rank <em>r = 4</em>:
        </p>

        <pre
          style={{
            backgroundColor: "#edf2f7",
            padding: "1rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        >
{`B: 1000 × 4   → 4,000 parameters
A: 4 × 1000    → 4,000 parameters

Total = 8,000 trainable parameters
vs. 1,000,000 in full fine-tuning`}
        </pre>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          That’s a reduction of over <strong>125× fewer parameters</strong>. Yet LoRA still
          captures the important task-specific changes, which is why it’s both efficient and
          effective.
        </p>
      </div>

          {/* Section Heading */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        4. How well does LoRA perform?
      </h2>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          A big question with any efficiency trick is: does it hurt performance? The experiments
          in the LoRA paper show that the answer is no. LoRA consistently matches or even exceeds
          full fine-tuning across several benchmarks, while training far fewer parameters.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          The figure below compares different fine-tuning strategies on two tasks:
          <strong> WikiSQL</strong> (a semantic parsing task) and <strong>MultiNLI</strong>
          (a natural language inference benchmark). The x-axis is the number of trainable
          parameters (log scale), and the y-axis is validation accuracy.
        </p>

        {/* Image block */}
        <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
          <img
            src="/ML-Experimentation-Hub/images/lora-results.png"
            alt="LoRA results showing validation accuracy vs trainable parameters"
            style={{
              width: "100%",
              maxWidth: "700px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "#4a5568", textAlign: "center", marginTop: "0.5rem" }}>
            <em>Figure: LoRA (purple triangles) reaches accuracy similar to or better than full fine-tuning,
            but with orders of magnitude fewer trainable parameters. Adapters and prefix tuning methods
            require more parameters and often perform worse.</em>
          </p>
        </div>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          Notice how LoRA sits near the top of both charts, close to or above full fine-tuning,
          while using 10× to 1000× fewer trainable parameters. This is the core reason LoRA has
          become the go-to method for adapting large models in practice.
        </p>
      </div>
            {/* Section Heading */}
            <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        5. Scaling LoRA to Large Models
      </h2>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          The LoRA paper demonstrates that the method scales effectively to the largest
          language models, including GPT-3 with 175B parameters. Here are the key points:
        </p>

        <ul style={{ fontSize: "1.05rem", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Full fine-tuning is infeasible:</strong> Storing a fine-tuned copy of GPT-3
            for every task would require about <strong>1.2 terabytes</strong> per model.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>LoRA is storage-efficient:</strong> Only the low-rank updates are stored,
            reducing per-task storage to about <strong>350 GB</strong>.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Lower training memory:</strong> Training with LoRA uses about <strong>3× less
            GPU memory</strong> compared to full fine-tuning.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>No inference overhead:</strong> The LoRA updates can be merged into the frozen
            weights, so the model runs just as fast as the base model at deployment.
          </li>
        </ul>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          This balance of <em>scalability, efficiency, and zero latency cost</em> explains why
          LoRA has quickly become the standard method for adapting the largest LLMs in practice.
        </p>
      </div>
            <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        6. Hyperparameters in LoRA: rank r and scaling α
      </h2>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          LoRA introduces two main hyperparameters that control how the low-rank updates behave:
        </p>

        <ul style={{ fontSize: "1.05rem", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Rank (r):</strong> the dimension of the low-rank bottleneck. Higher values
            allow more expressive updates but also increase the number of trainable parameters.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Scaling factor (α):</strong> rescales the low-rank update so that its impact
            is balanced with the frozen weights. In practice, the update is applied as
            <code style={{ backgroundColor: "#f1f5f9", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>
              ΔW = (α / r) · B A
            </code>
            .
          </li>
        </ul>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          The LoRA paper shows that performance is not very sensitive to these choices:
          small ranks and moderate scaling already give strong results.
        </p>

        {/* Image block */}
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <img
            src="/ML-Experimentation-Hub/images/lora-rank-sensitivity.png"
            alt="LoRA accuracy across different rank values"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "#4a5568", textAlign: "center", marginTop: "0.5rem" }}>
            <em>Figure: Validation accuracy with different ranks (r) on WikiSQL and MultiNLI.
            Even with r = 4 or r = 8, LoRA reaches near-optimal accuracy. Larger ranks like r = 64
            don’t provide meaningful gains.</em>
          </p>
        </div>

        <ul style={{ fontSize: "1.05rem", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            Very small ranks (<strong>r = 1 or 2</strong>) can reduce accuracy slightly.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            Moderate ranks (<strong>r = 4 or 8</strong>) usually perform just as well as large ranks,
            keeping LoRA efficient.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            The scaling factor <strong>α</strong> controls the relative strength of the update.
            A common heuristic is to set α = r, which keeps the effective scale stable as r changes.
          </li>
        </ul>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          The bottom line: LoRA is robust. You don’t need heavy hyperparameter tuning values like
          r = 4 or 8 with α = r already deliver strong results across tasks.
        </p>
      </div>
            {/* Section Heading */}
            {/* Section Heading */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "600",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        7. Conclusion
      </h2>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          LoRA is a simple but powerful idea: freeze the big model, and learn tiny low-rank
          updates instead of touching every weight. Here are the main takeaways:
        </p>

        <ul style={{ fontSize: "1.05rem", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Efficiency:</strong> LoRA reduces trainable parameters by 100× or more,
            cutting storage and memory while keeping accuracy high.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Practicality:</strong> LoRA adds no inference latency and makes it easy to
            swap adapters for different tasks.
          </li>
          <li style={{ marginBottom: "0.75rem" }}>
            <strong>Scalability:</strong> LoRA works at GPT-3 scale, shrinking task-specific
            storage from terabytes to gigabytes.
          </li>
        </ul>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          The bottom line: LoRA shows that we don’t need to fine-tune everything. With just a
          few smart low-rank updates, we can adapt massive language models efficiently,
          making fine-tuning practical for research labs and industry alike.
        </p>

        <p style={{ fontSize: "1rem", marginTop: "1rem", color: "#4a5568" }}>
          This write-up and all included figures are based on the paper
          <em> “LoRA: Low-Rank Adaptation of Large Language Models”</em> (Hu et al., 2021).
          For the full details, check out the original paper:{" "}
          <a
            href="https://arxiv.org/abs/2106.09685"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3182ce", textDecoration: "underline" }}
          >
            https://arxiv.org/abs/2106.09685
          </a>
        </p>
      </div>




    </main>
  );
}
