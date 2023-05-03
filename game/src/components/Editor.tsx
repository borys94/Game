import React, { useEffect, useState } from "react";
import Editor from "../lib/editor";
import tileList from "../lib/tiles";
import { Sprite } from "../lib/types";

import styles from "./Editor.module.scss";

let editor: Editor;

const emptyTiles = new Array(20).fill([]).map((x) => new Array(50).fill(0));

function EditorComponent() {
  const [map, setMap] = useState<string>();
  const [tiles, setTiles] = useState<number[][]>(emptyTiles);
  const [bgTiles, setBgTiles] = useState<number[][]>(emptyTiles);
  const [tilesDrawing, setTilesDrawing] = useState(true);
  const [activeTile, setActiveTile] = useState<Sprite & { id: number }>();

  useEffect(() => {
    if (!editor) {
      editor = new Editor();
    }
  }, []);

  const fillTile = (i: number, j: number) => {
    tiles[i][j] = activeTile?.id ?? 0;
    setTiles([...tiles]);
  };

  const fillBgTile = (i: number, j: number) => {
    bgTiles[i][j] = activeTile?.id ?? 0;
    setBgTiles([...bgTiles]);
  };

  const save = () => {
    console.log(
      JSON.stringify({
        tiles,
        bgTiles,
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e) {
      return;
    }
    const value = e.target.value as string;
    const map = editor.loadMap(value);
    setTiles([...map.tiles]);
    setBgTiles([...map.bgTiles]);
    setMap(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <div className={styles.tiles}>
          {bgTiles.map((row, i) =>
            row.map((tile, j) => (
              <div
                style={{
                  top: i * 32,
                  left: j * 32,
                  zIndex: !tilesDrawing ? 2 : 1,
                  opacity: !tilesDrawing ? 1 : 0.5,
                }}
                className={styles.tile}
                onClick={() => fillBgTile(i, j)}
              >
                <img
                  src={tileList[tile]?.asset}
                  alt={tileList[tile]?.asset}
                  width="100%"
                />
              </div>
            ))
          )}

          {tiles.map((row, i) =>
            row.map((tile, j) => (
              <div
                style={{
                  top: i * 32,
                  left: j * 32,
                  zIndex: tilesDrawing ? 2 : 1,
                  opacity: tilesDrawing ? 1 : 0.5,
                }}
                className={styles.tile}
                onClick={() => fillTile(i, j)}
              >
                <img
                  src={tileList[tile]?.asset}
                  alt={tileList[tile]?.asset}
                  width="100%"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className={styles.elements}>
          {Object.keys(tileList).map((tile) => (
            <img
              src={tileList[+tile].asset}
              alt={tile}
              onClick={() => setActiveTile(tileList[+tile])}
            />
          ))}
          <div onClick={() => setActiveTile(undefined)}>empty</div>
        </div>
        <div className={styles.activeElement}>
          <img src={activeTile?.asset} alt={activeTile?.asset} width="100%" />
        </div>
        <h2>{tilesDrawing ? "main tiles" : "bg tiles"}</h2>
        <button onClick={save}>Save</button>

        <button onClick={() => setTilesDrawing(!tilesDrawing)}>Swap</button>

        <select onChange={onChange} value={map}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="empty">Empty</option>
        </select>
      </div>
    </div>
  );
}

export default EditorComponent;
