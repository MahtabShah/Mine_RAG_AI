import { PresetDataset } from '../types';

export const PRESET_DATASETS: PresetDataset[] = [
  {
    id: 'dgms-inundation',
    title: 'DGMS SANKET: Mine Inundation & Water Irruption Analysis (1901-2022)',
    topic: 'Mine Inundation & Water Irruption Disasters',
    courseCode: 'DGMS SANKET',
    description: 'Official Directorate General of Mines Safety (DGMS) records on water irruption, drowning, major inundation disasters (Chasnalla, Gaslitand, Newton Chikli), Courts of Inquiry, and statutory CMR/MMR regulations.',
    sampleQuestions: [
      'What was the deadliest inundation accident in Indian mining history, and how many people died?',
      'What are the key findings and statutory violations in the 2020 Khoodia coal mine water inrush accident?',
      'Which Courts of Inquiry were constituted for inundation accidents between 1901 and 2022?',
      'What is the 60-meter statutory rule under CMR Regulations regarding waterlogged workings?',
      'How did the 2016 Turamdih Uranium mine water and sludge irruption occur?',
      'What happened during the 2017 Sayal D mine water dam failure?'
    ],
    content: `# DGMS SANKET: Mine Inundation, Water Irruption & Drowning Analysis (1901-2022)
Government of India | Ministry of Labour & Employment | Directorate General of Mines Safety (DGMS), Dhanbad

## 1. Classification & Scope of Inundation in Indian Mines
In the statutory reporting by the Directorate General of Mines Safety (DGMS) under the Mines Act, 1952, water hazards in mining operations are classified under specific cause codes:
- Code 0991: "Irruption of Water" (Sudden catastrophic inrush or breakthrough of water or liquid sludge into working places from surface water bodies, waterlogged old/adjacent workings, or failure of partings and barriers).
- Code 0993: "Drowning in Water" (Fatalities or injuries caused by persons falling or getting submerged in sumps, water-filled quarries, retention ponds, or water tanks).
- Code 0118: "Landslide / Dump Failure into Water" (Slumping of overburden benches or spoil dumps into waterlogged pits generating high-velocity flood waves).

Safety regulations governing inundation include:
- Coal Mines Regulations, 1957 (Regulations 126, 127, 128, 129) and Coal Mines Regulations, 2017 (Regulations 148, 149, 150, 151, 152).
- Metalliferous Mines Regulations, 1961 (Regulation 128, 114, 115).
- DGMS Technical Circulars: No. 7 of 1976 (Water Dams), No. 13 of 2002 (Risk Assessment for Sludge & Water), Circular 11 of 1959 (Fencing of Surface Water Bodies).

## 2. Decadal Trends in Coal Mines (2013 - 2022)
Statistical analysis from DGMS SANKET (Coal Mines) reveals:
### Dangerous Occurrences due to "Irruption of Water" (Table 2.6):
- 2013: 1 occurrence
- 2014: 4 occurrences
- 2015: 1 occurrence
- 2016: 0 occurrences
- 2017: 2 occurrences
- 2018: 0 occurrences
- 2019: 0 occurrences
- 2020: 1 occurrence
- 2021: 1 occurrence
- 2022: 2 occurrences
- Total Dangerous Occurrences (2013-2022): 12 occurrences of water irruption.

### Fatal Accidents due to Irruption of Water (Table 2.9):
- 2013: 0 fatal accidents (0 killed)
- 2014: 0 fatal accidents (0 killed)
- 2015: 1 fatal accident (1 killed)
- 2016: 0 fatal accidents (0 killed)
- 2017: 1 fatal accident (2 killed) [Sayal "D" Mine]
- 2018: 1 fatal accident (1 killed) [Kakatiya Khani No. 1 & 1A]
- 2019: 0 fatal accidents (0 killed)
- 2020: 1 fatal accident (2 killed) [Khoodia Mine]
- 2021: 0 fatal accidents (0 killed)
- 2022: 0 fatal accidents (0 killed)
- Total Fatal Accidents (2013-2022): 4 fatal accidents resulting in 6 deaths.

### Serious Accidents & Injuries due to Irruption of Water (Table 2.10):
- In 2019: 1 serious accident occurred with 5 persons seriously injured due to irruption of water.

### Drowning in Water Fatalities in Coal Mines (Code 0993):
- 2016: 2 deaths (Neyveli No. 2: M. Kumar, 46, and T. Kumaravel, 52).
- 2017: 1 death (Kuardih: Bishwanath Bouri, 44).
- 2018: 2 deaths (Neyveli No. 2: S. Ramar, 52; Garjanbahal OCP: G. Kutuan, 37).
- 2019: 1 death (Neyveli No. 1: K. Rasalingam, DGM, 59).
- 2020: 4 deaths (Sodepur: N. Kole, 47; Indaram Khani: E. Mahesh, 42; Moonidih: B. Bhuia, 58; Kusmunda: Suresh Das, 36).
- 2021: 2 deaths (Pauni OC: V.G. Hanskar, 19; Oil site: 1).
- 2022: 1 death (Jamdiha Stone Quarry tipper toppled into waterlogged area: O.K. Yadav, 28).

## 3. Decadal Trends in Non-Coal Mines (2013 - 2022)
Statistical analysis from DGMS SANKET (Non-Coal Mines):
- Table 2.6: Dangerous Occurrences due to "Irruption of water" recorded 1 occurrence in 2013 and 1 in 2015 (Total: 2).
- Table 2.9: Fatal Accidents under Code 0991 "Irruption of Water" recorded 1 accident with 3 fatalities in 2016 at Turamdih Uranium Project.
- Waterlogged pit & drowning fatalities in non-coal mines:
  - 2016: Turamdih Uranium Project (3 deaths from water/sludge irruption).
  - 2017: Masaro Ki Obri Serpentine (Vijender Singh, 30, excavator fell into waterlogged pit).
  - 2017: Itagi Limestone Mine (M. Diggi, 42 & Mahesh, 21, pump fell into rain water pit causing electrocution & drowning).
  - 2018: Ektarwa Stone Mine (Manoj Kumar Mehta, 26, tipper rolled back 25m into waterlogged quarry).
  - 2018: Birmitrapur Limestone & Dolomite (Addition Jojo, 49, tanker toppled 3.85m into waterlogged quarry).
  - 2019: Injepalli Limestone Mine (Md. Phaishal, 22, core sampling team member drowned in sump).
  - 2019: Purnadih Nawada Stone Mine (A.K. Singh, Agent, 62; A.K. Mehta, 28; B.K. Mehta, 30, drowned by 5-6m high velocity flood wave).
  - 2021: Bharuch Exploratory Oil & Gas Mine (V.S. Bhai, 21, drowned in drilling water tank).
  - 2022: Rajpura Dariba Lead & Zinc Mine (Jagdish Ch. Jat, 53, sucked into cleared drainage borehole and drowned in 1.1m water).

## 4. Historical Major Inundation Disasters in Indian Coal Mines (Since 1901, 4+ Fatalities)
From Chapter 10 of DGMS records:
1. Chasnalla (27-12-1975) - 375 Killed: Deadliest mine inundation disaster in India. Water from overlying waterlogged abandoned workings rushed into the deep working horizons.
2. Gaslitand (27-09-1995) - 64 Killed: Sudden catastrophic irruption of flood water from Katri river through breached dykes and surface fissures during monsoon flash flood.
3. Newton Chikli (10-12-1954) - 63 Killed: Massive water inundation into underground working faces.
4. Bagdigi (02-02-2001) - 29 Killed: Puncturing of a coal barrier into waterlogged unchartered workings of adjacent Jairampur colliery.
5. Burradhemo (26-09-1956) - 28 Killed: Inundation of water.
6. Central Bhowrah (20-02-1958) - 23 Killed: Irruption of water.
7. Phularitand (11-07-1912) - 21 Killed: Irruption of water.
8. Hurriladih (14-09-1983) - 19 Killed: Inundation from water accumulated in overlying or adjacent seam.
9. Godavari Khani No. 7 LEP (16-06-2003) - 17 Killed: Irruption of water.
10. Damua (05-01-1960) - 16 Killed: Irruption of water.
11. Central Sounda (15-06-2005) - 14 Killed: Irruption of water into underground workings.
12. Makerwal (06-07-1942) - 14 Killed: Irruption of water.
13. Jotejanake (28-06-1913) - 13 Killed: Irruption of water.
14. Majri (05-08-1953) - 11 Killed: Irruption of water.
15. Loyabad (16-01-1935) - 11 Killed: Irruption of water.
16. Silewara (18-11-1975) - 10 Killed: Inundation from Kanhan river bed / waterlogged strata.
17. Central Saunda (16-09-1976) - 10 Killed: Inundation of water.
18. Jamadoba (07-08-1913) - 7 Killed: Irruption of water.
19. Bhatdih (08-08-1913) - 7 Killed: Irruption of water.
20. Bhaskajuri (20-12-1928) - 7 Killed: Inundation of water.
21. Dhori (04-10-1950) - 7 Killed: Irruption of water.
22. Murulidih (26-10-1910) - 6 Killed: Irruption of water.
23. Ekra Khas (08-10-1948) - 6 Killed: Irruption of water.
24. Chinakuri (24-08-1953) - 6 Killed: Irruption of water.
25. Mahabir (13-11-1989) - 6 Killed: Irruption of water (Capsule rescue operated).
26. Kendwadih (22-04-1965) - 6 Killed: Irruption of water.
27. Chasnalla Second Incident (05-04-1976) - 5 Killed: Irruption of water during dewatering/recovery.
28. Pinalgoria (17-07-1942) - 4 Killed: Irruption of water.
29. Lodna (12-09-1956) - 4 Killed: Irruption of water.
30. Binodicutta (26-09-1956) - 4 Killed: Irruption of water.
31. Industry (17-08-1978) - 4 Killed: Irruption of water.
32. Katras-Choitodih (27-09-1995) - 4 Killed: Irruption of water.

### Major Inundation in Non-Coal Mines:
- Tadaiya Mica (05-11-1914): 5 Killed due to Irruption of Water.
- Pattabhirama & Margin Mica (06-12-1946): 8 Killed due to Irruption of Water.
- Rajpura Dariba Lead & Zinc (28-08-1994): 13 Killed due to Irruption of Water.

## 5. Courts of Inquiry Instituted by Government of India for Inundation
Under Section 24 of the Mines Act, 1952, Courts of Inquiry headed by sitting or retired judges and technical assessors were established:
- Jamadoba (07/08/1913) & Bhatdih (08/08/1913): 7 deaths each. Inundation.
- Bhaskajuri (20/12/1928): 7 deaths. District Magistrate with Chief Inspector of Mines and J. Mackie.
- Newton Chikli (10/12/1954): 63 deaths. Justice B.R. Sen, with M.L. Shome (Mining Engineer) and W.S. Barlingay (M.P.).
- Burradhemo (26/09/1956): 28 deaths. Commissioner, Burdwan, with Chief Inspector of Mines and S.C. Samanta (M.P.).
- Central Bhowrah (20/02/1958): 23 deaths. T.P. Singh (IAS), with B.H. Engineer and Jai Pal Singh (M.P.).
- Silewara (18/11/1975): 10 deaths. P.M. Nayak (ICS), with V.L. Karwande, Prof. G.S. Marwaha, S.W. Dhabe, S.K. Sanyal.
- Chasnalla (27/12/1975 & 05/04/1976): 375 & 5 deaths. Justice U.N. Sinha, with C. Karunakaran, G.S. Marwaha, Damodar Pandey (M.P.).
- Central Saunda (16/09/1976): 10 deaths. N.P. Dube (IAS), with Prof. S.S. Saluja and S. Das Gupta.
- Hurriladih (14/09/1983): 19 deaths. Justice C.T. Dighe, with K.M. Trivedi and G.S. Marwaha.
- Mahabir (13/11/1989): 6 deaths. P.C. Hota, with B.N. Tiwari and A.K. Ghosh.
- Gaslitand (27/09/1995) & Associated Mines: 64 deaths. Justice S.K. Mukherjee, with Prof. B.K. Mazumdar (ISM) and Rajender Singh (INTUC).
- Bagdigi (02/02/2001): 29 deaths. Justice Gurusharan Sharma, with Prof. Ravindra Nath (BHU) and Kamalesh Sahay (CCCKS).
- Godavari Khani No. 7 LEP (16/06/2003): 17 deaths. Justice Bilal Nazki, with A.K. Rudra and Kamalesh Sahay.
- Central Sounda (15/06/2005): 14 deaths. Dr. D.P. Shenoy, with Ravindra Sharma and Rajendra Pd. Singh.

## 6. Detailed Findings of Recent Inundation & Drowning Accidents (2016-2022)
### Case A: Khoodia Coal Mine (08.12.2020)
- Mine Owner: Eastern Coalfields Ltd., Dist: Dhanbad, Jharkhand.
- Casualties: 2 killed (B. Majhi, Pump Operator, 55; M. Bouri, Helper, 53).
- Finding: While four workers were resting in the rise side of the underground pumping station, there was a sudden inrush of water from the dip side. About 4.5m thick parting (silty shale, coal & geological disturbance) failed with the lower seam, which had a higher water level 250m away. Two pump operators were trapped and drowned.
- Preventative Violations: Workings were extended within 60m of waterlogged workings in contravention of Regulation 150(3) of CMR 2017; risk assessment under Regulation 150(2)(ii) & 104(1) was omitted; mine plans failed to show accurate geological disturbances under Regulation 65(1).

### Case B: Sayal "D" Coal Mine (16.08.2017)
- Mine Owner: Central Coalfields Ltd., Dist: Hazaribagh, Jharkhand.
- Casualties: 2 killed (P. Nonia, Trammer, 57; Ashok Kumar, Pump Khalasi, 47).
- Finding: A brick wall partly converted into an isolation stopping was holding accumulated water for pumping. It suddenly failed under hydrostatic water pressure and was washed away, resulting in inrush of water through main headings. Both workers were washed into the main dip sump.
- Preventative Violations: Brick stopping was used instead of a standard engineered water dam complying with Regulation 129(1) of CMR 1957 read with DGMS Technical Circular No. 7 of 1976; workers were deployed within 60m of waterlogged workings in violation of Regulation 127(1)&(3).

### Case C: Kuardih Coal Mine (25.07.2017)
- Mine Owner: Eastern Coalfields Ltd., Dist: Burdwan, West Bengal.
- Casualties: 1 killed (Bishwanath Bouri, SDL Operator, 44).
- Finding: Workers entered belowground when a surface stream (jore) was flowing above danger level. Surface flood water entered through shallow cover, abandoned backfilled pits, and collapsed an intermittent parting into the main dip.

### Case D: Turamdih Uranium Project (28.05.2016)
- Mine Owner: Uranium Corporation of India Ltd., Dist: West Singbhum, Jharkhand.
- Casualties: 3 killed (Milan Karmakar, 49; Suraj Kant Singh, 47; Sonaram Kisku, 23).
- Finding: While removing jammed muck in a decline connected to a vertical shaft filled up to 15.4m with water and sludge, 212 m3 of sludge and water suddenly rushed in, submerging and trapping 12 persons, killing 3 by asphyxiation.
- Violations: Contravened Regulation 128(1) of Metalliferous Mines Regulations, 1961 read with DGMS Technical Circular No. 13 of 2002.

### Case E: Purnadih Nawada Stone Mine (09.11.2019)
- Mine Owner: Sanjay Kumar Ray, Dist: Koderma, Jharkhand.
- Casualties: 3 killed (A.K. Singh, Agent, 62; A.K. Mehta, 28; B.K. Mehta, 30).
- Finding: A 55m x 18m x 20m rock and soil mass collapsed from 45-50m height into a 15-18m deep waterlogged quarry. The massive impact generated a 5m to 6m high-velocity flood wave (inundation tide) that hit all sides of the quarry and pulled three workers into the waterlogged pit, drowning them.

## 7. Key DGMS Regulatory Measures for Preventing Inundation
1. Statutory 60-Meter Barrier Rule (CMR 2017 Reg 149 & 150): No working shall be extended to within 60 metres of any waterlogged workings or surface water body without written permission of the Chief Inspector, exploratory advance boreholes, and constant surveillance.
2. Construction of Water Dams (DGMS Tech Circular No. 7 of 1976): Water must NEVER be stored behind ordinary brick isolation stoppings. Only reinforced concrete/masonry water dams designed for full hydrostatic head with drain pipes and pressure gauges are permitted.
3. Pre-Monsoon Precautions: Setting Highest Flood Level (HFL) and withdrawal levels; inspecting dykes, surface bunds, and abandoned pits; dewatering sumps before monsoon.
`
  },
  {
    id: 'cs640-transformers',
    title: 'Transformer Architectures & Attention Mechanisms',
    topic: 'Deep Learning & Natural Language Processing',
    courseCode: 'CS 640',
    description: 'Lecture notes covering Scaled Dot-Product Attention, Multi-Head Attention, Positional Encodings, and Transformer training dynamics.',
    sampleQuestions: [
      'Why is the dot-product divided by the square root of d_k in attention?',
      'How does Multi-Head Attention allow the model to attend to information at different positions?',
      'Explain the difference between sinusoidal positional encodings and learned embeddings.',
      'What is the role of Layer Normalization in transformer residual blocks?'
    ],
    content: `# Transformer Architectures & Attention Mechanisms (CS 640 Lecture Notes)

## 1. Introduction to the Transformer
The Transformer architecture, proposed by Vaswani et al. (2017) in "Attention Is All You Need", dispenses with recurrent and convolutional neural networks entirely. Instead, it relies exclusively on attention mechanisms to draw global dependencies between input and output representations. This parallelization fundamentally reduces training time on modern GPU hardware compared to sequential RNNs (LSTMs and GRUs).

## 2. Scaled Dot-Product Attention
The core building block is Scaled Dot-Product Attention. The input consists of queries (Q) and keys (K) of dimension d_k, and values (V) of dimension d_v.
The attention matrix is computed as:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V

### Scaling Factor Rationale
We divide by sqrt(d_k) because for large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients (vanishing gradient problem). The scaling factor counteracts this effect, maintaining unit variance when components of Q and K are independent random variables with zero mean and unit variance.

## 3. Multi-Head Attention
Instead of performing a single attention function with d_model dimensional queries, keys, and values, Multi-Head Attention linearly projects the queries, keys, and values h times with different, learned linear projections to d_k, d_k, and d_v dimensions respectively.
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W^O
where head_i = Attention(Q * W_i^Q, K * W_i^K, V * W_i^V)
In the standard Base Transformer, h = 8 parallel attention heads are used, with d_k = d_v = d_model / h = 64 (given d_model = 512). This allows the model to jointly attend to information from different representation subspaces at different positions.

## 4. Positional Encoding
Because the Transformer contains no recurrence and no convolution, to make the model aware of the order of the tokens, we must inject information about relative or absolute position.
Vaswani et al. employ sine and cosine functions of different frequencies:
PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))
This formulation allows the model to easily learn to attend by relative positions, since for any fixed offset k, PE(pos + k) can be represented as a linear function of PE(pos).

## 5. Feed-Forward Networks and Residual Connections
Each encoder layer consists of two sub-layers: a multi-head self-attention mechanism, and a simple, position-wise fully connected feed-forward network (FFN):
FFN(x) = max(0, x * W1 + b1) * W2 + b2
The inner dimension d_ff is typically 2048 (4 * d_model).
Around each of the two sub-layers, a residual connection followed by Layer Normalization is employed:
Output = LayerNorm(x + Sublayer(x))
Layer Normalization normalizes activations across the channel dimension for each individual training sample independently, stabilizing forward and backward passes.

## 6. Training Hyperparameters & Optimizer
The base model is optimized using Adam with beta_1 = 0.9, beta_2 = 0.98, and epsilon = 10^-9. A warmup schedule increases the learning rate linearly for the first 4,000 warmup steps, followed by an inverse square root decay:
lrate = d_model^(-0.5) * min(step_num^(-0.5), step_num * warmup_steps^(-1.5))
Dropout with P_drop = 0.1 is applied to the output of each sub-layer and positional embeddings. Label smoothing with epsilon_ls = 0.1 is used during loss calculation.
`
  },
  {
    id: 'bio310-crispr',
    title: 'CRISPR-Cas9 Molecular Biology & Gene Editing',
    topic: 'Genetics & Molecular Biotechnology',
    courseCode: 'BIO 310',
    description: 'Detailed experimental dataset on Type II bacterial adaptive immunity, guide RNA structure, Cas9 nuclease domains, and repair pathways.',
    sampleQuestions: [
      'What is the function of the Protospacer Adjacent Motif (PAM) in Cas9 binding?',
      'Compare Non-Homologous End Joining (NHEJ) and Homology-Directed Repair (HDR).',
      'Which catalytic domains of Cas9 cleave the complementary and non-complementary DNA strands?',
      'How does engineered SpCas9 reduce off-target cleavage events?'
    ],
    content: `# CRISPR-Cas9 Molecular Biology & Gene Editing (BIO 310 Research Notes)

## 1. Bacterial Adaptive Immunity Overview
CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) and Cas (CRISPR-associated) proteins constitute an adaptive immune system in bacteria and archaea. The Streptococcus pyogenes Type II CRISPR system relies on a single Cas9 endonuclease directed by dual RNA molecules (crRNA and tracrRNA), which were engineered by Jinek and Doudna (2012) into a chimeric single-guide RNA (sgRNA).

## 2. Guide RNA Architecture and Target Recognition
The sgRNA comprises a 20-nucleotide custom spacer sequence complementary to the target protospacer on the genomic DNA, linked to a conserved scaffold hairpin required for Cas9 protein binding.
Target search occurs via three-dimensional diffusion and transient sampling of DNA for a Protospacer Adjacent Motif (PAM).
For Streptococcus pyogenes Cas9 (SpCas9), the canonical PAM sequence is 5'-NGG-3' situated immediately 3' of the target sequence. Without an intact PAM, Cas9 cannot unwind the DNA duplex or initiate R-loop formation.

## 3. Catalytic Cleavage Domains
Cas9 contains two distinct nuclease domains that execute double-strand breaks (DSBs) 3 base pairs upstream of the PAM:
1. RuvC Domain: Cleaves the non-target (non-complementary) DNA strand.
2. HNH Domain: Cleaves the target (complementary) DNA strand hybridized to the sgRNA spacer.
Inactivating both domains creates Catalytically Dead Cas9 (dCas9), which retains DNA binding without cutting, used for transcriptional regulation (CRISPRi and CRISPRa) and epigenetic editing. Inactivating one domain produces a "Cas9 Nickase" (nCas9) creating single-strand nicks.

## 4. Endogenous Cellular DNA Repair Pathways
Once Cas9 generates a double-strand break, eukaryotic cells repair the lesion using two competing pathways:
### Non-Homologous End Joining (NHEJ)
The primary pathway active throughout all cell cycle phases (G1, S, G2). Ku70/Ku80 heterodimers bind broken ends, recruiting DNA-PKcs and Ligase IV. NHEJ is error-prone, frequently introducing insertions and deletions (indels) of 1-10 bp. When these indels occur within an exon, they cause frameshift mutations and premature stop codons, achieving targeted gene knockout.

### Homology-Directed Repair (HDR)
A high-fidelity pathway restricted to the late S and G2 phases when sister chromatids are available. By introducing an exogenous repair template (ssODN or plasmid containing homologous left and right arms), researchers can insert precise point mutations, tags, or entire cDNA sequences.

## 5. Off-Target Effects and Fidelity Engineering
High Cas9 concentrations can cause cleavage at homologous genomic loci with 1-3 mismatches. To mitigate off-target cleavage:
1. High-Fidelity Variants: SpCas9-HF1, eSpCas9(1.1), and HypaCas9 introduce neutral mutations in the DNA-binding groove, requiring stringent guide-target complementarity before nuclease activation.
2. Paired Nickases: Dual nCas9 with two offset sgRNAs targeting opposite strands generates 5' overhang DSBs, drastically reducing indel rates at single off-target nick sites.
`
  },
  {
    id: 'econ405-inflation',
    title: 'Monetary Policy, Central Banking & Inflation Dynamics',
    topic: 'Macroeconomics & Financial Systems',
    courseCode: 'ECON 405',
    description: 'Empirical data and lecture slides on the Phillips curve, Taylor Rule, Quantitative Easing (QE), and supply-shock vs demand-pull inflation.',
    sampleQuestions: [
      'What is the formula and intuition behind the Taylor Rule for monetary policy?',
      'Distinguish between Demand-Pull and Cost-Push inflation with real-world examples.',
      'How does Quantitative Easing (QE) affect the yield curve compared to conventional rate cuts?',
      'Why did the short-run Phillips curve flatten between 2000 and 2020?'
    ],
    content: `# Monetary Policy, Central Banking & Inflation Dynamics (ECON 405 Syllabus Data)

## 1. Defining Price Stability and Inflation Measures
Inflation represents a sustained increase in the aggregate price level of goods and services, reducing purchasing power over time. Central banks, including the Federal Reserve and the European Central Bank, target an annualized inflation rate of 2.0% measured by either the Consumer Price Index (CPI) or the Personal Consumption Expenditures (PCE) price index. Core inflation excludes volatile food and energy components to reflect underlying long-term trends.

## 2. Inflation Typologies and Transmission Mechanisms
### Demand-Pull Inflation
Occurs when aggregate demand (AD) outpaces aggregate supply (AS) at full employment capacity:
AD = C + I + G + (X - M)
Rapid fiscal stimulus, ultra-low interest rates, or credit expansion shift the AD curve rightward along an inelastic short-run aggregate supply curve, bidding up prices and wages.

### Cost-Push Inflation
Driven by exogenous supply shocks that shift the short-run aggregate supply (SRAS) curve leftward. Examples include geopolitical oil supply disruptions, maritime shipping route bottlenecks, and agricultural commodity failures. This dynamic triggers "stagflation" characterized by rising prices alongside contracting GDP output.

## 3. The Taylor Rule Framework
Formulated by John B. Taylor in 1993, the Taylor Rule prescribes how nominal central bank policy rates (i_t) should adjust in response to deviations in inflation and output:
i_t = r* + pi_t + 0.5 * (pi_t - pi*) + 0.5 * (y_t - y*)
Where:
- r* is the equilibrium real interest rate (historically estimated around 2.0%)
- pi_t is the current rate of inflation
- pi* is the central bank's inflation target (2.0%)
- (y_t - y*) is the output gap: percent deviation of real GDP from potential output
If inflation surges 1% above target, the nominal rate should rise by more than 1% (here 1.5%), ensuring real interest rates increase to cool overheating demand (the Taylor Principle).

## 4. Unconventional Monetary Policy: Quantitative Easing (QE)
When nominal policy rates hit the Effective Lower Bound (ELB) of 0%, traditional open-market operations cannot lower short rates further.
Central banks initiate Quantitative Easing (QE): large-scale asset purchases of long-term government bonds and mortgage-backed securities funded by newly created bank reserves.
QE operates through two distinct channels:
1. Portfolio Rebalancing Channel: Lowering long-term yields pushes institutional investors into equities and corporate credit, reducing borrowing costs across the economy.
2. Signalling Channel: Committing the central bank to keep policy rates lower for longer than previously anticipated.

## 5. The Evolution of the Phillips Curve
The traditional Phillips Curve observed an inverse relationship between unemployment and wage inflation. The Expectations-Augmented Phillips Curve introduces inflation expectations (pi^e):
pi_t = pi_t^e - beta * (u_t - u_n) + v_t
Where u_n is the Natural Rate of Unemployment (NAIRU) and v_t represents supply shocks. In recent decades, central bank credibility has well-anchored inflation expectations, leading to a flatter slope beta, meaning unemployment fluctuations produce smaller swings in price inflation.
`
  }
];
