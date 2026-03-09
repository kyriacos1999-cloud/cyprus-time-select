export type AkisBranch = {
  name: string;
  city: string;
  address: string;
};

export const akisBranches: AkisBranch[] = [
  // Nicosia
  { name: "Naxou Branch", city: "Nicosia", address: "Naxou 12AB, 1070 Nicosia" },
  { name: "Agios Dometios Branch", city: "Nicosia", address: "Grigori Afxentiou 34, 2360 Agios Dometios" },
  { name: "Strovolos Branch", city: "Nicosia", address: "Leoforos Strovolou 331z, Strovolos" },
  { name: "Strovolos (Acropolis) Branch", city: "Nicosia", address: "Leoforos Strovolou 20, Strovolos" },
  { name: "Engomi Branch", city: "Nicosia", address: "Ionos 6a, Engomi" },
  { name: "Latsia Branch", city: "Nicosia", address: "Leoforos Giannou Kranidioti 20, Latsia" },
  { name: "Lakatamia Branch", city: "Nicosia", address: "Lakatamia, Nicosia" },
  { name: "Pallouriotissa Branch", city: "Nicosia", address: "16 Avgoustou 1, Pallouriotissa" },
  { name: "Dasoupoli Branch", city: "Nicosia", address: "Leoforos Athalassas 129, Dasoupoli, Strovolos" },
  { name: "Aglantzia Branch", city: "Nicosia", address: "Aglantzia, Nicosia" },
  { name: "Geri Branch", city: "Nicosia", address: "Geriou 14a, Geri" },
  { name: "Tseri Branch", city: "Nicosia", address: "Theodosi Pieridi 9, Tseri" },
  { name: "Kokkinotrimithia Branch", city: "Nicosia", address: "Grigori Afxentiou 82b, Kokkinotrimithia" },
  { name: "Nisou Branch", city: "Nicosia", address: "Aigaiou 3, Nisou" },
  { name: "Akaki (Agent)", city: "Nicosia", address: "Nicosia Avenue 113, Akaki, Peristerona" },
  { name: "Athiainou (Agent)", city: "Nicosia", address: "4 Agias Marinas Str., 7600 Athiainou" },

  // Limassol
  { name: "Agios Athanasios Hub", city: "Limassol", address: "11 Evelthontos Ioannidi, 4102 Agios Athanasios" },
  { name: "Omonias Branch", city: "Limassol", address: "39C Vasileos Pavlou, 3052 Limassol" },
  { name: "Thessalonikis Branch", city: "Limassol", address: "43 Thessalonikis, 3025 Limassol" },
  { name: "Ayia Fila (Agent)", city: "Limassol", address: "Ayias Filaxeos 269, 3116 Limassol" },
  { name: "Germasogeia Branch", city: "Limassol", address: "Germasogeia, Limassol" },
  { name: "Kato Polemidia Branch", city: "Limassol", address: "Kato Polemidia, Limassol" },
  { name: "Pano Polemidia Branch", city: "Limassol", address: "Pano Polemidia, Limassol" },
  { name: "Mesa Geitonia Branch", city: "Limassol", address: "Mesa Geitonia, Limassol" },
  { name: "Ypsonas Branch", city: "Limassol", address: "Ypsonas, Limassol" },
  { name: "Asgata (Agent)", city: "Limassol", address: "8 Georgiou Katsari, 4502 Asgata" },

  // Larnaca
  { name: "Aradipou Hub", city: "Larnaca", address: "8 Andrea Zakou, 7101 Aradippou Industrial Area" },
  { name: "Larnaca Branch", city: "Larnaca", address: "Larnaca Centre" },
  { name: "Alethriko (Agent)", city: "Larnaca", address: "60 Anexartisias, 7570 Alethriko" },

  // Paphos
  { name: "Kiniras Branch", city: "Paphos", address: "3 Kiniras Street, 8011 Paphos" },
  { name: "Paphos Branch", city: "Paphos", address: "Paphos Centre" },
  { name: "Agent Tala", city: "Paphos", address: "Miltiadi Stylianou Ave., Stephania Court, 8577 Tala" },
  { name: "Polis Branch", city: "Paphos", address: "Polis Chrysochous" },

  // Ammochostos (Famagusta)
  { name: "Ayia Napa (Agent)", city: "Ammochostos", address: "Nissi Avenue 46, 5330 Ayia Napa" },
  { name: "Paralimni Branch", city: "Ammochostos", address: "Paralimni" },
  { name: "Protaras Branch", city: "Ammochostos", address: "Protaras" },
];

export const branchCities = [...new Set(akisBranches.map((b) => b.city))];
