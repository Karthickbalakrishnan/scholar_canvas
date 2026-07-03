// Data Taxonomy Map
export const RESEARCH_TREE = {
  key: "all",
  label: "All Research Disciplines",
  children: [
    {
      key: "systems",
      label: "Systems",
      children: [
        { key: "os", label: "Operating Systems" },
        { key: "arch", label: "Architecture" },
        { key: "hpc", label: "High-Performance Computing" }
      ]
    },
    {
      key: "theory",
      label: "Theory",
      children: [
        { key: "algorithms", label: "Algorithms & Complexity" },
        { key: "crypto", label: "Cryptography" }
      ]
    },
    {
      key: "interdisciplinary",
      label: "Interdisciplinary",
      children: [
        { key: "bio", label: "Computational Biology" },
        { key: "robotics", label: "Robotics" }
      ]
    }
  ]
};

// Procedural high-fidelity generation representing 100 top global research hubs
const REGIONS = ["North America", "Europe", "Asia", "Australasia", "Latin America"];
const AREAS = ["Systems", "Theory", "Interdisciplinary"];
const SUBAREAS = ["os", "arch", "hpc", "algorithms", "crypto", "bio", "robotics"];
const VENUES = ["OSDI", "SOSP", "STOC", "FOCS", "ISCA", "MICRO", "SC", "EUROSYS"];
const FIRST_NAMES = ["Alex", "Elena", "Marcus", "Siddharth", "Yuki", "Chloe", "Chen", "Amara", "Viktor", "Sofia"];
const LAST_NAMES = ["Smith", "Chen", "Kumar", "Rodriguez", "Müller", "Sato", "Patel", "Ivanov", "Kim", "Lin"];

const baseInstitutions = [
  "Massachusetts Institute of Technology", "Stanford University", "Carnegie Mellon University", 
  "UC Berkeley", "Harvard University", "Oxford University", "Cambridge University", 
  "ETH Zurich", "National University of Singapore", "Tsinghua University", "Peking University", 
  "University of Toronto", "EPFL", "Technical University of Munich", "University of Tokyo", 
  "Seoul National University", "University of Washington", "Cornell University", "Princeton University", 
  "Caltech", "Georgia Tech", "UIUC", "UT Austin", "University of Michigan", "UCSD", "UCLA", 
  "Columbia University", "UPenn", "Yale University", "NYU", "University of Edinburgh", 
  "Imperial College London", "UCL", "INRIA", "Sorbonne University", "University of Amsterdam", 
  "Nanyang Technological University", "HKUST", "University of Hong Kong", "Kyoto University", 
  "KAIST", "Indian Institute of Science", "IIT Bombay", "IIT Delhi", "Australian National University", 
  "University of Melbourne", "University of Sydney", "University of São Paulo", "UNICAMP", 
  "TUDelft", "KTH Royal Institute of Technology", "Aarhus University", "University of Copenhagen", 
  "Weizmann Institute", "Technion", "Tel Aviv University", "McGill University", "UBC", 
  "Waterloo University", "University of Edinburgh", "RWTH Aachen", "Karlsruhe Institute of Technology", 
  "Ludwig Maximilian University", "Heidelberg University", "Zhejiang University", "Shanghai Jiao Tong University", 
  "Fudan University", "USTC", "Tokyo Institute of Technology", "Osaka University", "POSTECH", 
  "Yonsei University", "Indian Institute of Statistical Science", "IIT Madras", "IIT Kanpur", 
  "University of Queensland", "UNSW Sydney", "Monash University", "University of Auckland", 
  "Universidad de Chile", "ITESM", "UNAM", "King Abdullah University of Science and Technology", 
  "CERN Academic Institute", "Max Planck Institute for Informatics", "Lund University", 
  "Uppsala University", "University of Helsinki", "Oslo University", "Trinity College Dublin", 
  "University of Warsaw", "Charles University", "Sapienza University of Rome", "University of Bologna", 
  "Polytechnic University of Milan", "University of Barcelona", "Autonomous University of Madrid", 
  "University of Lisbon", "National Taiwan University", "Kyushu University"
];

export const INSTITUTIONS = baseInstitutions.map((name, index) => {
  // Distribute across regions cleanly
  const region = REGIONS[index % REGIONS.length];
  
  // Assign ranking distribution flags
  let rankTier = "Global Top 100";
  if (index < 10) rankTier = "Global Top 10";
  else if (index < 50) rankTier = "Global Top 50";

  // Faculty generation schema
  const facultyCount = 4 + (index % 5); 
  const faculty = Array.from({ length: facultyCount }, (_, fIdx) => {
    const fName = `${FIRST_NAMES[(index + fIdx) % FIRST_NAMES.length]} ${LAST_NAMES[(index * fIdx + 3) % LAST_NAMES.length]}`;
    const tier = fIdx % 2 === 0 ? "established" : "emerging";
    
    // Generate sample baseline matching papers covering timeline parameters 2016 - 2026
    const paperCount = 3 + ((index + fIdx) % 6);
    const papers = Array.from({ length: paperCount }, (_, pIdx) => {
      const year = 2016 + ((index + fIdx + pIdx) % 11); // Spans 2016 to 2026
      const area = AREAS[(index + pIdx) % AREAS.length];
      const subarea = SUBAREAS[(index * pIdx + 2) % SUBAREAS.length];
      const venue = VENUES[(index + pIdx) % VENUES.length];
      
      return {
        title: `Decentralized Analysis Framework for ${subarea.toUpperCase()} Processing in Structural Networks`,
        venue: venue,
        year: year,
        area: area,
        subarea: subarea,
        code: (index + pIdx) % 2 === 0,
        dataset: (index + pIdx) % 3 === 0
      };
    });

    return { name: fName, tier, papers };
  });

  return {
    id: `inst-${index + 1}`,
    name,
    region,
    rankTier,
    faculty
  };
});