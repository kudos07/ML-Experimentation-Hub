---
## 📚 Reference & Credits
This blog is an educational interpretation of the paper:  
**LoRA: Low-Rank Adaptation of Large Language Models**  
Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Weizhu Chen, and Jianfeng Gao.  
*arXiv preprint arXiv:2106.09685, 2021*  

📄 Original paper: [https://arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)  

All figures included here are taken directly from the paper and belong to the authors.  
If any of the authors prefer that these figures not be used, please contact me and I will remove or replace them immediately.  


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
