import React from "react";
import * as S from "./Block.styles";

const Block = ({ blocks }) => {
  return (
    <>
      {blocks &&
        blocks.map((block) => (
          <S.Block key={block.title}>
            <h1>{block.title}</h1>
            <p>{block.description}</p>
          </S.Block>
        ))}
    </>
  );
};

export default Block;
