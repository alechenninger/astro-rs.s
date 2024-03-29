import fs from 'fs';
import mm from 'music-metadata';

function date(day) {
  return new Date(`${day}T00:00-05:00`);
}

var episodes = [
  {
    title: 'Fresh Perspectives',
    description: `Sneha is back at work from maternity leave and wants to seize the opportunity her fresh perspective brings to her team. The gang explores the value of perspectives of all kinds–fresh ones, old ones, or (especially) competing ones–and how to better develop and integrate each for better judgments.`,
    publishedDate: date('2022-10-01')
  },
  {
    title: 'The Quality Question',
    description: `Sneha wonders, "How can I influence my team to think like a 
    quality engineer?" What does it mean to think like a QA, and how has Amy and Alec's beginnings 
    as quality engineers shaped their perspective years later? The group discusses how quality 
    relates to feedback loops, cognitive load, business context, architecture, leadership, and 
    culture–ultimately concluding that quality is really a system-level outcome.`,
    publishedDate: date('2022-11-01')
  }
];

// todo: put all metadata in mp3?
// var mp3s = import.meta.glob('/public/episodes/*.mp3');

// note: rather than use git lfs and run up quota both there and on hosting
// provider, we could "just" use hosting provider for this metadata
// -- or -- just skip the mp3 bits if not found locally. means we couldn't
// put all of the metadata in the mp3s, though, but maybe that's fine.

await (async () => {
  for (var i = 0; i < episodes.length; i++) {
    var ep = episodes[i];
    var number = i + 1;
    ep.number = i + 1;

    var mp3 = `public/episodes/${number}.mp3`;

    if (fs.existsSync(mp3)) {
      var stats = fs.statSync(mp3);
      var metadata = await mm.parseFile(mp3);

      ep.seconds = metadata.format.duration;
      ep.bytes = stats.size;
      ep.type = "audio/mpeg";
    }
  }
})();

export default episodes;