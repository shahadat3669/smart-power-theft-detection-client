import { Box, SvgIcon } from '@mui/material';
import React from 'react';
import audio1 from './src_siren.mp3';
import { useGauge } from 'use-gauge';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const START_ANGLE = 45;
const END_ANGLE = 315;
let count = 0;
const MySwal = withReactContent(Swal);
const Device = ({ value = 0, name = 'test', unit = 't' }) => {
  const gauge = useGauge({
    domain: [0, 1000],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 11,
    diameter: 200,
  });
  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2,
  });
  if (name === 'wattage_difference' && value > 20) {
    count++;
    if (count > 2) {
      count = 0;
      MySwal.fire({
        title: 'Theft detected ',
        text: 'Fix It',
        icon: 'error',
        backdrop: false,
        confirmButtonText: 'YES',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Fixed!', 'success');
        }
      });
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      {count > 3 ? (
        <audio preload="auto" autoplay="true" src={audio1}>
          Your browser does not support the HTML5 audio element.
        </audio>
      ) : (
        ''
      )}
      <SvgIcon
        {...gauge.getSVGProps()}
        sx={{
          overflow: 'visible',
          fontSize: '100px',
          height: '10rem',
          margin: 'auto 25px',
        }}>
        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: 30,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE,
            })}
            fill="none"
            stroke="#e5e7eb"
            strokeLinecap="round"
            strokeWidth={24}
          />
          <path
            {...gauge.getArcProps({
              offset: 30,
              startAngle: START_ANGLE,
              endAngle: gauge.valueToAngle(value),
            })}
            fill="none"
            stroke="#4ade80"
            strokeLinecap="round"
            strokeWidth={24}
          />
        </g>
        <g id="ticks">
          {gauge.ticks.map(angle => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue % 10 === 0;

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  stroke="#d1d5db"
                  strokeWidth={2}
                  {...gauge.getTickProps({
                    angle,
                    length: showText ? 12 : 6,
                  })}
                />

                {showText && (
                  <Box
                    component="text"
                    sx={{
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem',
                      fill: '#9ca3af',
                    }}
                    {...gauge.getLabelProps({ angle, offset: 20 })}>
                    {asValue}
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <circle fill="#d1d5db" {...needle.base} r={20} />
          <circle fill="#374151" {...needle.base} />
          <circle fill="#374151" {...needle.tip} />
          <polyline fill="#374151" points={needle.points} />
          <circle fill="#fff" {...needle.base} r={4} />
        </g>
      </SvgIcon>
      <Box>
        {`${name}:
        ${value} ${unit}`}
      </Box>
    </Box>
  );
};

export default Device;
