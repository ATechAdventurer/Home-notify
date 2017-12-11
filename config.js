let Config = {};
Config.url = "https://cosbycompoundserver.localtunnel.me";
Config.sounds = [
  { title: "Hail Enarc", url: `${Config.url}/Normies.mp3`},
  { title: "OH MY GOD", url: "https://nofile.io/g/DwHhNLPhO9UtuLhM2a3Q6nGuIWtErklERm1keYVmGr4yfAcjvOJbpyvrw8rxUj3A/OH+MY+GOD.mp3/"},
  { title: "Cosby Compound", url: `${Config.url}/Cosby_Compound.mp3`},
  { title: "MR. Krabs", url: `${Config.url}/mk.mp3`} 
];
Config.devices = [
  { title: "Cam's Bedroom", ip: "192.168.86.30"},
  { title: "Olivia's Bedroom", ip: "192.168.86.45"},
  { title: "Kitchen", ip: "192.168.86.28"}
];
module.exports = Config;