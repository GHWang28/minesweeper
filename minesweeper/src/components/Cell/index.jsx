import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { useLongPress } from 'use-long-press';
import { calcDistance } from '../../game-logic';

const generateIcon = (inputData, sweeped) => {
  // if (inputData.isFlagged && !sweeped) return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'red\' class=\'bi bi-flag-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001\'/%3E%3C/svg%3E");'
  if (!sweeped) return '';
  if (inputData.isMine) return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'2\' fill=\'red\' viewBox=\'0 0 50 50\'%3E%3Cpath style=\'line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:%23000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal\' d=\'M 24.984375 1.9863281 A 1.0001 1.0001 0 0 0 24 3 L 24 7.0488281 C 19.788099 7.2817221 15.969452 8.9603227 13.021484 11.607422 L 10.150391 8.7363281 A 1.0001 1.0001 0 0 0 9.4335938 8.4335938 A 1.0001 1.0001 0 0 0 8.7363281 10.150391 L 11.603516 13.017578 C 8.9676792 15.970574 7.2834883 19.792069 7.0507812 24 L 3 24 A 1.0001 1.0001 0 1 0 3 26 L 7.0507812 26 C 7.2834883 30.207931 8.9676792 34.029426 11.603516 36.982422 L 8.7363281 39.849609 A 1.0001 1.0001 0 1 0 10.150391 41.263672 L 13.021484 38.392578 C 15.969452 41.039677 19.788099 42.718278 24 42.951172 L 24 47 A 1.0001 1.0001 0 1 0 26 47 L 26 42.951172 C 30.211901 42.718278 34.030548 41.039677 36.978516 38.392578 L 39.849609 41.263672 A 1.0001 1.0001 0 1 0 41.263672 39.849609 L 38.396484 36.982422 C 41.032321 34.029426 42.716512 30.207931 42.949219 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 42.949219 24 C 42.716512 19.792069 41.032321 15.970574 38.396484 13.017578 L 41.263672 10.150391 A 1.0001 1.0001 0 0 0 40.537109 8.4335938 A 1.0001 1.0001 0 0 0 39.849609 8.7363281 L 36.978516 11.607422 C 34.030548 8.9603227 30.211901 7.2817221 26 7.0488281 L 26 3 A 1.0001 1.0001 0 0 0 24.984375 1.9863281 z M 20.5 15 C 23.538 15 26 17.462 26 20.5 C 26 23.538 23.538 26 20.5 26 C 17.462 26 15 23.538 15 20.5 C 15 17.462 17.462 15 20.5 15 z\'/%3E%3C/svg%3E")'
  switch (inputData.totalAdjBombs) {
    case 1: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'blue\' class=\'bi bi-1-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z\'/%3E%3C/svg%3E")'
    case 2: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'green\' class=\'bi bi-2-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z\'/%3E%3C/svg%3E")'
    case 3: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'red\' class=\'bi bi-3-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z\'/%3E%3C/svg%3E")'
    case 4: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'purple\' class=\'bi bi-4-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z\'/%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.519 5.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265Z\'/%3E%3C/svg%3E")'
    case 5: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'black\' class=\'bi bi-5-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.994 12.158c-1.57 0-2.654-.902-2.719-2.115h1.237c.14.72.832 1.031 1.529 1.031.791 0 1.57-.597 1.57-1.681 0-.967-.732-1.57-1.582-1.57-.767 0-1.242.45-1.435.808H5.445L5.791 4h4.705v1.103H6.875l-.193 2.343h.064c.17-.258.715-.68 1.611-.68 1.383 0 2.561.944 2.561 2.585 0 1.687-1.184 2.806-2.924 2.806Z\'/%3E%3C/svg%3E")'
    case 6: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'gray\' class=\'bi bi-6-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8.111 7.863c-.92 0-1.564.65-1.564 1.576 0 1.032.703 1.635 1.558 1.635.868 0 1.553-.533 1.553-1.629 0-1.06-.744-1.582-1.547-1.582Z\'/%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.21 3.855c1.612 0 2.515.99 2.573 1.899H9.494c-.1-.358-.51-.815-1.312-.815-1.078 0-1.817 1.09-1.805 3.036h.082c.229-.545.855-1.155 1.98-1.155 1.254 0 2.508.88 2.508 2.555 0 1.77-1.218 2.783-2.847 2.783-.932 0-1.84-.328-2.409-1.254-.369-.603-.597-1.459-.597-2.642 0-3.012 1.248-4.407 3.117-4.407Z\'/%3E%3C/svg%3E")'
    case 7: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'maroon\' class=\'bi bi-7-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.37 5.11V4.001h5.308V5.15L7.42 12H6.025l3.317-6.82v-.07H5.369Z\'/%3E%3C/svg%3E")'
    case 8: return 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' stroke=\'whitesmoke\' stroke-width=\'1\' width=\'16\' height=\'16\' fill=\'turquoise\' class=\'bi bi-8-square-fill\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M6.623 6.094c0 .738.586 1.254 1.383 1.254s1.377-.516 1.377-1.254c0-.733-.58-1.23-1.377-1.23s-1.383.497-1.383 1.23Zm-.281 3.644c0 .838.72 1.412 1.664 1.412.943 0 1.658-.574 1.658-1.412 0-.843-.715-1.424-1.658-1.424-.944 0-1.664.58-1.664 1.424Z\'/%3E%3Cpath d=\'M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm8.97 9.803c0 1.394-1.218 2.355-2.988 2.355-1.763 0-2.953-.955-2.953-2.344 0-1.271.95-1.851 1.647-2.003v-.065c-.621-.193-1.33-.738-1.33-1.781 0-1.225 1.09-2.121 2.66-2.121s2.654.896 2.654 2.12c0 1.061-.738 1.595-1.336 1.782v.065c.703.152 1.647.744 1.647 1.992Z\'/%3E%3C/svg%3E")'
    default: return ''
  }
}

const generateColor = (inputData, inputSweep, gameOver) => {
  if (!gameOver) return (inputSweep) ? 'burlywood' : 'rgb(113,222,73)';
  
  const charred = Math.max(20, 110 - inputData.charred * 10);
  return `rgb(${charred},${charred},${charred})`
}

export default function Cell ({ onLeftClick, onRightClick, data, hoveringCell, odd }) {
  // Redux
  const gameOver = useSelector(state => state.gameOver);
  const gameWon = useSelector(state => state.gameWon);
  
  const [lastFlagged, setLastFlagged] = useState(0);

  // React spring animation
  const transitions = useTransition(data.isSweeped, {
    from: { rotateY: '-180deg' },
    enter: { rotateY: '0deg' },
    leave: { rotateY: '180deg' },
    delay: 75 * calcDistance(data, hoveringCell)
  })

  const onRightClickWrap = (event) => {
    event.preventDefault();
    if (data.isSweeped || Date.now() - lastFlagged <= 950) return;
    onRightClick();
    setLastFlagged(Date.now());
  }
  const onLeftClickWrap = () => {
    if (data.isFlagged || data.isSweeped || gameOver || gameWon) return;
    onLeftClick();
  } 
  const longPress = useLongPress(onRightClickWrap, {
    onCancel: onLeftClickWrap,
    threshold: 250,
    filterEvents: (event) => (event.button !== 2), // All events can potentially trigger long press
    captureEvent: true,
    cancelOnMovement: false,
  });

  const AnimatedBox = animated(Box);
  
  return transitions((style, dataTransition) => (
    <AnimatedBox
      style={style}
      className={dataTransition || gameOver ? '' : 'cell'}
      {...longPress()}
      sx={{
        width: '101%',
        height: '101%',
        bgcolor: generateColor(data, dataTransition, gameOver),
        filter: (gameOver && !data.isMine) ? 'grayscale(1)' : ((odd) ? 'brightness(0.92)' : 'brightness(1)'),
        cursor: (dataTransition || gameOver) ? 'auto' : 'pointer',
        backgroundImage: generateIcon(data, dataTransition || gameOver),
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        backgroundPosition: 'center',
        backfaceVisibility: 'hidden',
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate: '-50% -50%'
      }}
      onContextMenu={onRightClickWrap}
    />
  ))
}