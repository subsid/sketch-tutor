import {Point, PDollarRecognizer} from './PDollar';
import _ from 'lodash';

function convertToPoints(lines) {
  return _.flatten(lines.map((line, strokeId) => {
    return line.map((p) => new Point(p.x, p.y, strokeId));
  }));
}

const recognizer = new PDollarRecognizer();
function compareWithTemplate(templateId, lines) {
  const distances = recognizer.Recognize(convertToPoints(lines));

  return distances[templateId];
}

export default compareWithTemplate;
