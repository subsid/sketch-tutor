import {Point, PDollarRecognizer} from './PDollar'
import _ from 'lodash';

function convertToPoints(lines) {
  return _.flatten(lines.map((line, strokeId) => {
    return line.map((p) => new Point(p.x, p.y, strokeId))
  }))
}

const recognizer = new PDollarRecognizer();
function compareWithTemplate(templateId, lines) {
  console.log(recognizer.Recognize(convertToPoints(lines)))
  console.log('got called', templateId, lines.length);
}

export default compareWithTemplate;
