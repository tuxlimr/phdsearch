import { Program } from './types';

export const MOCK_PROGRAMS: Program[] = [
  {
    id: 1,
    title: "PhD in Computational Neuroscience",
    university: "University of Cambridge",
    department: "Department of Applied Mathematics and Theoretical Physics",
    country: "United Kingdom",
    location: "Cambridge, UK",
    degreeType: "PhD",
    deadline: "15 Oct 2024",
    scholarshipStatus: "Scholarship Available",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBO4BZiKhie8kzJxRDKej0YXF0j4-mV_1sBed9RTbdJqZ194pg3tyJlX_ubJi7YLtpX7vP8FJYRJhaAU-zbmanOSL1eo6gRfIRxFnWFt1FbDt9HqIRcaTdcG5QPGkhiXzdo71_gq7uENigHtLttwE6-9uyYj7uDfxqjY71JCMFJdtsZlryBBo7aiJe3VZ8v7jecZZHVE2IgCV4dkuTSkC5Qz9E5_evPE6cfsImlEi_gzDpE8WKgkrwdrChayEqT07PB53rq8BLlV2m",
    duration: "3-4 Years",
    mode: "Full-time",
    startDate: "October 2025",
    tuition: "£9,250 (Home) / £32,000 (Overseas) per year",
    description: "The PhD in Computational Neuroscience at Cambridge offers a unique interdisciplinary environment. Students work at the intersection of neuroscience, mathematics, and computer science to understand the principles of brain function. The program fosters a collaborative atmosphere with access to world-class facilities and supervision from leading experts in the field.",
    eligibility: [
      "A first-class or strong upper-second-class undergraduate degree with honours in mathematics, physics, engineering, or computer science.",
      "Evidence of strong mathematical and programming skills.",
      "English language proficiency (IELTS 7.5 or equivalent).",
      "Two academic references.",
      "A research proposal outlining your area of interest."
    ],
    deadlines: {
      early: "December 3, 2024 (Gates Cambridge)",
      final: "October 15, 2024"
    }
  },
  {
    id: 2,
    title: "Master in Machine Learning & AI",
    university: "ETH Zurich",
    department: "Department of Computer Science",
    country: "Switzerland",
    location: "Zurich, Switzerland",
    degreeType: "MSc",
    deadline: "01 Dec 2024",
    scholarshipStatus: "Fully Funded",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL5wUNIAqVPZPPjZNa3SELI2O17h9DzLM457AXK7LIatL5IahAypH59rlWPkZmE676j-W4oc36FaaqgA1U2neS8MNj0DEhNn-qiSGMsK3zS1zLWN2Sn-HJFBPLDm4LAOv3kPbArjvT2X-SXvA9mUesjnZEC7lpGpavIup-w9oPkDZdvGAHwcdI-LmW1Nu2P0jcsynPFiPNV8AMxnlBm6nNjMAGOEnkKsSv1sP-NBN9uYPwMFWdzIqbmi4SjxaUUqER-RekRROFwUwC",
    duration: "2 Years",
    mode: "Full-time",
    startDate: "September 2025",
    tuition: "CHF 730 per semester",
    description: "This specialized Master's program provides a deep foundation in the theory and practice of Machine Learning and Artificial Intelligence. ETH Zurich is renowned for its excellence in engineering and technology. The curriculum covers statistical learning, deep neural networks, robotics, and ethical AI, preparing students for both industry leadership and academic research.",
    eligibility: [
      "Bachelor's degree in Computer Science, Mathematics, Physics, or Electrical Engineering.",
      "Excellent academic performance (top 10% of class).",
      "GRE scores are strongly recommended for non-EU/EFTA applicants.",
      "Proficiency in English (C1 level).",
      "Statement of purpose explaining your motivation and background."
    ],
    deadlines: {
      early: "November 1, 2024",
      final: "December 01, 2024"
    }
  },
  {
    id: 3,
    title: "PhD Program in Systems Biology",
    university: "Harvard University",
    department: "Harvard Medical School",
    country: "USA",
    location: "Boston, MA, USA",
    degreeType: "PhD",
    deadline: "15 Nov 2024",
    scholarshipStatus: "Scholarship Available",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuByhtvVi44ueegl8bELeFXCrXrs9N9Aecohz85AtHwff0OREOFGC-drdSlJyvd6iVkob9deONSgCQaOae_lpzzHaOUtdhYUxZDgnTLo3DR767icQS2TTIrestoHYLr0lsN_DNSOByyZqqngPunVpppacwbalCDwnP6zsN3uhczmHsr4iNCU_y_u58zSBGoaWGz09z3-Q-0VVLwNyKKQ53o7vVetB458NIUClzzpx1fvQ1jGSFNGVPWvrv8Zih5LtjlGaDOFaUdwnTgG",
    duration: "5-6 Years",
    mode: "Full-time",
    startDate: "August 2025",
    tuition: "Full tuition support and stipend provided",
    description: "The Systems Biology PhD program at Harvard aims to train students to use quantitative and computational approaches to solve biological problems. Students learn to model complex biological systems, from molecular circuits to whole organisms. The program emphasizes interdisciplinary training and research rotations in various labs before choosing a thesis advisor.",
    eligibility: [
      "Undergraduate degree in biology, mathematics, physics, chemistry, or computer science.",
      "Strong background in quantitative sciences.",
      "Previous research experience is highly valued.",
      "Three letters of recommendation.",
      "Personal statement describing research interests."
    ],
    deadlines: {
      final: "November 15, 2024"
    }
  },
  {
    id: 4,
    title: "Neuroscience Graduate Program",
    university: "Stanford University",
    department: "School of Medicine",
    country: "USA",
    location: "Stanford, CA, USA",
    degreeType: "PhD",
    deadline: "31 Jan 2025",
    scholarshipStatus: "Fully Funded",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKvyh3DPR1-d-kv48rzHpA4AKg9xLgf7Eoxqit3RuKKk2a78RYZC667sAfaJOrRoAzEM1Z-pHxP4ViUIBRWsKCvGy7H6DeeHt2H0BBvCQKXw0uWGIx29X8NHwBmLawcjKNT7WurQjvRmrIuHtDIlBEdC0Nhq3CMIzAcwhaj3pevIbX5X4KlfFg7NsaEl19pWAb8PdRYr2IrkV59ZIDHJATXlZkaqMI6q8awDSz00Ijr-19XVi68tEdVgdBqnVZqa6aG37zFQ6M9RBT",
    duration: "5-6 Years",
    mode: "Full-time",
    startDate: "September 2025",
    tuition: "Full funding for all admitted students",
    description: "The Stanford Neuroscience PhD program offers comprehensive training in all areas of modern neuroscience, from molecules to behavior. The program is designed to create independent, creative scientists. Students have the freedom to choose from over 100 faculty mentors and access state-of-the-art research facilities in the heart of Silicon Valley.",
    eligibility: [
      "Bachelor's degree from an accredited institution.",
      "Strong academic record in relevant science courses.",
      "Significant research experience.",
      "TOEFL scores for international applicants.",
      "Diversity statement and three letters of recommendation."
    ],
    deadlines: {
      final: "January 31, 2025"
    }
  }
];

export const PROFILE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_phCE79DibplWEqcXZx4UFji0UkiktbTusVXFKk5NZsNm4sqvmTlArvTbg0KO7CyFKApxvaiqrvAo_jKpDyYFWGVNBdhoyNiw4QQkXP7r7g-BaHjVq1qBCp2Z3mpHhrjQZJojq186w6kdUmmBrMe8_szmMF_jsNG9tw6qpbJV271HhglpbFD0Jr_kskWavbD1gXRNM4thiKzxnXN54W0GiwUIsU00E719yv8hM7-brBZqL__XucR_t7UPzwRp9FiGBNC8-FWKmFX";