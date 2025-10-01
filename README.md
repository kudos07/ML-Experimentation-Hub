# LoRA Blog – Beginner-Friendly Walkthrough

This project is a **Next.js + Node.js** single-page blog that explains the paper  
**[LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021)](https://arxiv.org/abs/2106.09685)**  
in a clear, visual, and beginner-friendly way.

---

## 🙏 Immense Credit to the Researchers
All the ideas, results, and figures in this blog come directly from the groundbreaking work of the LoRA authors:  

- **Edward J. Hu**  
- **Yelong Shen**  
- **Phillip Wallis**  
- **Zeyuan Allen-Zhu**  
- **Yuanzhi Li**  
- **Shean Wang**  
- **Weizhu Chen**  
- **Jianfeng Gao**

This blog is only an **educational interpretation** aimed at beginners. The research credit belongs entirely to these authors.  

Paper link: [https://arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)  

---

## 📖 What’s Inside
The blog walks through LoRA step by step:
1. Introduction  
2. Problem Statement – Why not fine-tune everything?  
3. Key Definitions (fine-tuning, adapters, prefix tuning, etc.)  
4. How LoRA introduces low-rank updates (math + toy example)  
5. How well does LoRA perform? (results with accuracy vs. parameters)  
6. Scaling LoRA to Large Models (GPT-3, storage/memory savings)  
7. Hyperparameters: rank r and scaling α  
8. Why LoRA is Practical  
9. Conclusion  

All figures shown are taken directly from the original paper (Hu et al., 2021).  

---

## 🚀 Running Locally

Clone this repository:

```bash
git clone https://github.com/kudos07/ML-Experimentation-Hub.git
cd ML-Experimentation-Hub
