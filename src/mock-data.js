const EVENT_DATA = [
  {
    EventId: 1,
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
    name: "Backend creëren",
    description: "",
    date: new Date(2021, 11, 2, 13, 0, 0, 0),
    type: { naam: "School", d: "blue" },
  },
  {
    EventId: 2,
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
    name: "Backend testen",
    description: "Controleren of er een robuste api is ontwikkeld",
    date: new Date(2021, 11, 2, 22, 0, 0, 0),
    type: { naam: "Werk", d: "yellow" },
  },
  {
    EventId: 3,
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff83",
    name: "Hardlopen",
    description: "",
    date: new Date(2021, 12, 8, 17, 0, 0, 0),
    type: { naam: "Vrije tijd", d: "green" },
  },
  {
    EventId: 4,
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff83",
    name: "Programmeren",
    description: "",
    date: new Date(2021, 10, 29, 17, 0, 0, 0),
    type: { naam: "Vrije tijd", d: "green" },
  },
];

const REMINDER_DATA = [
  {
    ReminderId: 1,
    EventId: 1,
    Beschrijving: "Backend creëren start binnenkort",
    Datum: new Date(2021, 12, 8, 11, 30, 0),
  },
  {
    ReminderId: 2,
    EventId: 2,
    Beschrijving: "Laatste testen uitvoeren",
    Datum: new Date(2021, 12, 2, 16, 30, 0),
  },
  {
    ReminderId: 3,
    EventId: 2,
    Beschrijving: "Meerdere testen uitvoeren",
    Datum: new Date(2021, 12, 8, 16, 0, 0),
  },
];

const USER_DATA = [
  {
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff84",
    Voornaam: "Joran",
    Familienaam: "Van Belle",
  },
  {
    userId: "7f28c5f9-d711-4cd6-ac15-d13d71abff83",
    Voornaam: "Lobke",
    Familienaam: "Lowie",
  },
];

const TYPE_DATA = [
  {
    naam: "Vrije tijd",
    d: "green",
  },
  {
    naam: "School",
    d: "blue",
  },
  {
    naam: "Werk",
    d: "yellow",
  },
];

const HERHALING_DATA = [
  {
    naam: "Geen herhaling",
    d: "Geen herhaling",
  },
  {
    naam: "Dagelijks",
    d: "Dagelijks",
  },
  {
    naam: "Weekelijks",
    d: "Weekelijks",
  },
  {
    naam: "Maandelijks",
    d: "Maandelijks",
  },
];

export { EVENT_DATA, USER_DATA, REMINDER_DATA, TYPE_DATA, HERHALING_DATA };
