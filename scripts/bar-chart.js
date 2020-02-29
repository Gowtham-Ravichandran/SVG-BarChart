/*<----------Constant values used to space rows and columns--------------------------->*/
const xAxisStartPoint = 0;
const yAxisStartPoint = 5;
const barWidth = 30;
const yAxisDifference = 50;
const xAxisDifference = 200;
/*<----------------------------------------------------------------------------------->*/


/*<--------------------- Try Playing with these values----------------------------->*/
/* Bar Specific Data */
const data = [{'10/3/14':-1.45,'10/3/15':-1.45},
              {'10/3/15':4.56,'10/3/16':4.56},
              {'10/3/16':9.00,'10/3/17':9.00},
              {'10/3/17':1.45,'10/3/18':-1.45},
              {'10/3/18':12.00,'10/3/19':12.00}
            ]

/* Y Axis Start and End Points and Difference between each */
const valueStart = -10;
const valueEnd = 20;
const valueDifference = 10;
var baseXAxis = 0;
/*<----------------------------------------------------------------------------------->*/

const xAxisEndPoint = xAxisDifference*(data.length+1);

var lastDrawnXAxisPosition = 0;

function drawChart(){
    const svg = createSVGElement();
    drawXAxisLinesAndYAxisLabels(svg);
    drawBars(svg);
    drawXAxisLabels(svg);
    createStripesPattern(svg);
    document.getElementById('barChart').appendChild(svg);
}

function createSVGElement(){
    const frame = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    frame.setAttribute('height',(data.length*yAxisDifference+(yAxisDifference*4)));
    frame.setAttribute('width',(data.length+1)*xAxisDifference);
    frame.setAttribute('class','graph');
    return frame;
}

function drawXAxisLinesAndYAxisLabels(svgNode){
    let yAxis = yAxisStartPoint;
    let n = valueEnd;
    while(n >= valueStart-valueDifference){
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1',xAxisStartPoint);
        line.setAttribute('x2',xAxisEndPoint);
        line.setAttribute('y1',yAxis);
        line.setAttribute('y2',yAxis);
        line.setAttribute('stroke','gray');
        line.setAttribute('stroke-width',0.5);
        svgNode.appendChild(line);
        if(n >= valueStart){
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute('x',0);
            text.setAttribute('y',yAxis+(yAxisDifference/2));
            text.appendChild(document.createTextNode(n));
            svgNode.appendChild(text);
        }
        lastDrawnXAxisPosition =  yAxis;
        yAxis += yAxisDifference;
        if(n == baseXAxis){
            baseXAxis  =  yAxis; 
        }
        n -= valueDifference;
    }
}

function drawBars(svgNode){
    let xStart = xAxisDifference;
    data.map((item,i)=>{
        let barStart = xStart;
        Object.keys(item).map((label, j) => {
            const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            let height = item[label] * (yAxisDifference / valueDifference);
            bar.setAttribute('x', barStart);
            if (height >= 0) {
                bar.setAttribute('y', baseXAxis - height);
            }
            else {
                bar.setAttribute('y', baseXAxis);
            }
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', Math.abs(height));
            if(j%2 == 0){
                bar.setAttribute('fill', 'green');  
            }   
            else{
                bar.setAttribute('fill', 'url(#stripes)');
            }
            svgNode.appendChild(bar);
            barStart += barWidth;
        })
        xStart += xAxisDifference;
    })
}

function drawXAxisLabels(svgNode){

    let labelAxisHeightDifference = yAxisDifference*2;

    const labelText1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelText1.setAttribute('x',0);
    labelText1.setAttribute('y',lastDrawnXAxisPosition+(yAxisDifference*0.8));
    const labelText1Content = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    const labelText1SuperScript = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    labelText1Content.appendChild(document.createTextNode("NET"));
    labelText1SuperScript.setAttribute('dy',-1);
    labelText1SuperScript.appendChild(document.createTextNode("*"));
    labelText1Content.appendChild(labelText1SuperScript);
    labelText1.append(labelText1Content);
    svgNode.appendChild(labelText1);

    const labelText2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelText2.setAttribute('x',0);
    labelText2.setAttribute('y',lastDrawnXAxisPosition+(yAxisDifference*1.4));
    const labelText2Content = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    const labelText2SuperScript = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    labelText2Content.appendChild(document.createTextNode("GROSS"));
    labelText2SuperScript.setAttribute('dy',-1);
    labelText2SuperScript.appendChild(document.createTextNode("*"));
    labelText2Content.appendChild(labelText2SuperScript);
    labelText2.append(labelText2Content);
    svgNode.appendChild(labelText2);

    let xStartPositionLabel = xAxisDifference+barWidth-(barWidth/3);

    data.map((item,i)=>{
        let yStartPositionLabel = lastDrawnXAxisPosition+(yAxisDifference*0.8);
        Object.keys(item).map((label,j)=>{
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute('x',xStartPositionLabel);
            text.setAttribute('y',yStartPositionLabel);
            text.appendChild(document.createTextNode(item[label].toFixed(2)));
            svgNode.appendChild(text);
            yStartPositionLabel = lastDrawnXAxisPosition+(yAxisDifference*1.4);
        })
        xStartPositionLabel += xAxisDifference;
    })

    for(let i = 0; i < 2; i++){
        lastDrawnXAxisPosition += labelAxisHeightDifference;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1',xAxisStartPoint);
        line.setAttribute('x2',xAxisEndPoint);
        line.setAttribute('y1',lastDrawnXAxisPosition);
        line.setAttribute('y2',lastDrawnXAxisPosition);
        line.setAttribute('stroke','gray');
        line.setAttribute('stroke-width',0.5);
        svgNode.appendChild(line);
    }

    let xStartPositionLabel1 = xAxisDifference;

    data.map((item,i)=>{
        let yStartPositionLabel = lastDrawnXAxisPosition-(yAxisDifference*0.6);
        Object.keys(item).map((label,j)=>{
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute('x',xStartPositionLabel1);
            text.setAttribute('y',yStartPositionLabel);
            text.appendChild(document.createTextNode(Object.keys(item)[Object.keys(item).length-1-j]));
            svgNode.appendChild(text);
            yStartPositionLabel = lastDrawnXAxisPosition-(yAxisDifference*1.2);
        })
        xStartPositionLabel1 += xAxisDifference;
    })

    const legendCircleRadius = 7;

    const legendCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    legendCircle1.setAttribute('cx',0+legendCircleRadius);
    legendCircle1.setAttribute('cy',lastDrawnXAxisPosition-(yAxisDifference*0.7));
    legendCircle1.setAttribute('r',legendCircleRadius);
    legendCircle1.setAttribute('fill','url(#stripes)');
    svgNode.appendChild(legendCircle1);

    const legendCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    legendCircle2.setAttribute('cx',0+legendCircleRadius);
    legendCircle2.setAttribute('cy',lastDrawnXAxisPosition-(yAxisDifference*1.3));
    legendCircle2.setAttribute('r',legendCircleRadius);
    legendCircle2.setAttribute('fill','green');
    svgNode.appendChild(legendCircle2);
}

function createStripesPattern(svgNode){
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1',0);
    line.setAttribute('x2',0);
    line.setAttribute('y1',0);
    line.setAttribute('y2',4);
    line.setAttribute('stroke','#000000');
    line.setAttribute('stroke-width','2');
    pattern.appendChild(line);
    pattern.setAttribute('id','stripes');
    pattern.setAttribute('patternUnits','userSpaceOnUse');
    pattern.setAttribute('patternTransform','rotate(45)');
    pattern.setAttribute('width',4);
    pattern.setAttribute('height',4);
    defs.appendChild(pattern);
    svgNode.appendChild(defs);
}
