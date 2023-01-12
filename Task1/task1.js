const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`

let resultObject = {list: []};

function xmlToObject() {
  const parser = new DOMParser();
  const xmlFile = parser.parseFromString(xmlString, 'text/xml');
  const listNode = xmlFile.querySelector('list');
  const studentNode = listNode.querySelectorAll('student');

  for (let student of studentNode) {

    const nameNode = student.querySelector('name');
    const firstName = nameNode.querySelector('first').textContent;
    const lastName = nameNode.querySelector('second').textContent;
    const ageNode = student.querySelector('age');
    const profNode = student.querySelector('prof');
    const langAttr = student.querySelector('name').getAttribute('lang');

    resultObject.list.push(
      {
        name: `${firstName} ${lastName}`,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr
      }
    )
  }
}

xmlToObject();
console.log(resultObject);



