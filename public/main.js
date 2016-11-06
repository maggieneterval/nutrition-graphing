//constants
const margin = {top: 20, right: 20, bottom: 150, left: 40};
const h = 650 - margin.top - margin.bottom;
const w = 1000 - margin.left - margin.right;

//scales:
const x = d3.scaleBand()
  .range([0, w])
  .padding(0.1);

const y = d3.scaleLinear()
  .range([h, 0]);

//axes:
const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y)
  .tickFormat(d3.format('.0%'));

const svg = d3.select('#main')
  .append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

function drawGraph (ndbno) {

  d3.selectAll('rect').remove();
  d3.selectAll('.axis').remove();
  //todo: transition out exit selection + transition axes instead of manually clearing chart

  fetchNutritionReport(ndbno, 'f', USDA_API_KEY)
    .then(data => {
      const dataset = buildArray(data);

      x.domain(dataset.map(d => d.nutrient));
      y.domain([0, d3.max(dataset, d => d.percentDV)]);

      const rects = svg.selectAll('rect')
        .data(dataset, d => d.nutrient);

      rects
        .enter()
        .append('rect')
        .attr('x', d => x(d.nutrient))
        .attr('y', h)
        .attr('height', 0)
        .attr('width', x.bandwidth())
        .attr('fill', d => `rgb(${Math.round(d.percentDV * 300)}, 0, 0)`)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('y', d => y(d.percentDV))
        .attr('height', d => h - y(d.percentDV));

    svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .call(xAxis)
        .attr('class', 'axis')
        .selectAll('text')
        .style('text-anchor', 'end')
        .style('font-size', '12px')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');

    svg.append('g')
        .call(yAxis)
        .attr('class', 'axis');

  });

}

drawGraph(45018364);

//todo: add tooltip with exact nutrient quantity in g, mg, etc.
