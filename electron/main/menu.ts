module.exports = [
  {
    label: "Electron",
    submenu: [
      {
        label: "Item 1",
        click: () => {
          console.log("Hello Elec");
        },
        accelerator: "Alt+a",
      },
      { label: "Item 2", submenu: [{ label: "sub Item 1" }] },
      {
        label: "Item 3",
        enabled: false,
      },
    ],
  },
  {
    label: "Vue",
    submenu: [
      {
        label: "devTools",
        role: "toggleDevTools",
      },
      { label: "Item 23" },
      { label: "Item 34" },
    ],
  },
];
