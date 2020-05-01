import React, {useEffect, useRef} from 'react';
import {select, line, area, scaleBand, scaleLinear, max, extent, axisBottom, axisLeft, curveCardinal, curveBasis} from 'd3';

const LineChart = ({data}) => {

    console.log(data)

  const svgRef = useRef();

  useEffect(() => {

    const svg = select(svgRef.current);
   
    const width = +svg.attr('width')
    const height = +svg.attr('height')   

    const margin = { top: 100, right: 20, bottom: 30, left: 120 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom



    const xScale = scaleBand()
      .domain(data.map((d) => d.dimension))
      .range([0, innerWidth])

    const yScale = scaleLinear()
      .domain(extent(data.map((d) => d.measure )))
      .range([innerHeight, 0]);

      const g =  svg.append('g') 
      .attr('transform', `translate(${margin.left},${margin.top})`)   

      g.append('g').call(axisLeft(yScale))
      g.append('g').call(axisBottom(xScale))
          // move x axis to bottom of chart
      .attr('transform', `translate(0,${innerHeight})`) 


    const myArea =area()
      .x((d) => xScale(d.dimension) + 33)
      .y0(innerHeight)
      .y1((d) => yScale(d.measure))
      .curve(curveBasis)

    g
      .selectAll('path')
      .attr('class', 'line-path')
      .data([data])
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('d', (d) => myArea(d))
  }, [data]);
  return (
    <>
        <br />
      <svg ref={svgRef} width="960" height="500">
      </svg>
    </>
  );
};
export default LineChart;