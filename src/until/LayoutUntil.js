import React from 'react';
import {LayoutProvider} from 'recyclerlistview';
import {Dimensions} from 'react-native';

export function LayoutUntil() {}

function getWindownWidth() {
  return Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;
}

export function GetLayoutProvider(type) {
  switch (type) {
    case 0:
      return new LayoutProvider(
        () => {
          return 'VSEL';
        },
        (type, dim, index) => {
          const columnWidth = getWindownWidth() / 3;
          switch (type) {
            case 'VSEL':
              if (index % 3 === 0) {
                dim.width = 3 * columnWidth;
                dim.height = 300;
              } else if (index % 2 === 0) {
                dim.width = 2 * columnWidth;
                dim.height = 250;
              } else {
                dim.width = columnWidth;
                dim.height = 250;
              }
              break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
        },
      );
    case 1:
      return new LayoutProvider(
        () => {
          return 'VSEL';
        },
        (type, dim) => {
          switch (type) {
            case 'VSEL':
              dim.width = getWindownWidth() / 2;
              dim.height = 250;
              break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
        },
      );
    case 2:
      return new LayoutProvider(
        () => {
          return 'VSEL';
        },
        (type, dim) => {
          switch (type) {
            case 'VSEL':
              dim.width = getWindownWidth();
              dim.height = 200;
              break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
        },
      );
    default:
      return new LayoutProvider(
        () => {
          return 'VSEL';
        },
        (type, dim) => {
          switch (type) {
            case 'VSEL':
              dim.width = getWindownWidth();
              dim.height = 300;
              break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
        },
      );
  }
}
