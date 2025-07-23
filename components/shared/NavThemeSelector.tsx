import React from "react";

const NavThemeSelector = () => {
  return (
    <select data-choose-theme className="select select-bordered w-28">
      <option value="" disabled>
        Tema seç
      </option>
      <option value="light">Default</option>
      <option value="dark">Dark</option>
      <option value="cupcake">Cupcake</option>
      <option value="bumblebee">Bumblebee</option>
      <option value="emerald">Emerald</option>
      <option value="corporate">Corporate</option>
      <option value="synthwave">Synthwave</option>
      <option value="retro">Retro</option>
      <option value="cyberpunk">Cyberpunk</option>
      <option value="valentine">Valentine</option>
      <option value="halloween">Halloween</option>
      <option value="garden">Garden</option>
      <option value="forest">Forest</option>
      <option value="aqua">Aqua</option>
      <option value="lofi">Lofi</option>
      <option value="pastel">Pastel</option>
      <option value="fantasy">Fantasy</option>
      <option value="wireframe">Wireframe</option>
      <option value="black">Black</option>
      <option value="luxury">Luxury</option>
      <option value="dracula">Dracula</option>
      <option value="cmyk">CMYK</option>
      <option value="autumn">Autumn</option>
      <option value="business">Business</option>
      <option value="acid">Acid</option>
      <option value="lemonade">Lemonade</option>
    </select>
  );
};

export default NavThemeSelector;
