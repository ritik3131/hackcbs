const ARWindow = (props) => {
  const { model, position, preset, scale } = props;
  position = position ?? "0 0 0";
  preset = preset ?? "hiro";
  const scaleStr =
    typeof scale === "number"
      ? `${scale} ${scale} ${scale}`
      : `${scale[0]} ${scale[1]} ${scale[2]}`;

  return (
    <a-scene embedded arjs>
      <a-marker preset={preset}>
        {/* <!-- we use cors proxy to avoid cross-origin problems ATTENTION! you need to set up your server -->*/}
        <a-entity
          position={position}
          scale={scaleStr}
          gltf-model={model}
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};
