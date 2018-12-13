const fs = require('fs-extra');
const path = require('path');

module.exports = {
  getContext: () => {

    const archie = fs.readJsonSync(
      path.resolve(process.cwd(), 'src/data/archie.json'));

    const contextData = fs.readJsonSync(
      path.resolve(process.cwd(), 'src/data/data.json'));

    const meta = fs.readJsonSync(
      path.resolve(process.cwd(), 'meta.json'));

    const BDE = fs.readJsonSync(
      path.resolve(process.cwd(), 'src/data/BDE.json'));
    const bienen = fs.readJsonSync(
        path.resolve(process.cwd(), 'src/data/bienen-blues.json'));
        const CRITTERS = fs.readJsonSync(
          path.resolve(process.cwd(), 'src/data/campus-critters.json'));
    const templateContext = {
      META: meta,
      DATA: contextData,
      ARCHIE: archie,
      ENV: process.env.NODE_ENV,
      BIENEN: bienen,
    };

    return templateContext;
  }
}
