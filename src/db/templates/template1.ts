const style = `
  body {
    font-family: 'Times New Roman';
  }
  .document {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 563px;
    margin: 0 auto;
    border: 2px solid #494948;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    background-color: #f1f0ee;
  }
  .header {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 20px;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }
  .fullName {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    font-weight: 700;
    font-size: 40px;
    font-style: italic;
  }
  .about {
    width: 250px;
    font-style: italic;
  }
  .content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    padding: 20px;
  }
  .field {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .fieldTitle {
    width: 230px;
    font-size: 27px;
    font-weight: 700;
    font-style: italic;
    color: #b99a46;
  }
  .fieldContent {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    flex-grow: 1;
  }
  .fieldContent > *:nth-child(1n + 2) {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    margin-top: 5px;
  }
  .divider {
    display: block;
    width: 100%;
    height: 1px;
    margin: 15px auto;
    background-color: #cbcecb;
  }
  .experience-name {
    font-size: 22px;
  }
  .experience-location {
    font-size: 17px;
  }
  .experience-period {
    font-style: italic;
    font-size: 13px;
    margin: 5px 0;
  }
  .experience-description {
  }
  .skills {
  }
  .skill {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .skill-name {
    margin-right: 20px;
  }
  .skill-rating {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border: 1px solid black;
  }
  .skill-rating-fill {
    width: 30px;
    height: 7px;
    background-color: #b99a46;
  }
  .skill-rating-blank {
    width: 30px;
    height: 7px;
    background-color: #fff;
  }
`;

export { style };
