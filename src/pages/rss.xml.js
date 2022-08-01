import rss from '@astrojs/rss';
import episodes from '../assets/episodes.js';

// todo: it would be nice to use localhost when using dev
const image = new URL('/running-silhouttes.png', import.meta.env.SITE);
const title = 'Running Software Systems';

export async function get() { 
  return rss({
    title: title,
    xmlns: {
      "itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      "content": "http://purl.org/rss/1.0/modules/content/",
    },
    description: 'A show about systems, software, running, and running software systems.',
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: episodes.map((e, i) => {
      var number = i + 1;
      var path = `episodes/${number}.mp3`;
      return {
        title: e.title,
        // todo: itunes uses as web page corresponding to episode
        // and astro uses guid from link
        // so we should probably have per episode pages
        link: path,
        description: e.description,
        customData: `
        <enclosure>
          <url>${new URL(path, import.meta.env.SITE)}</url>
          <length>${e.bytes}</length>
          <type>${e.type}</type>
        </enclosure>
        <itunes:duration>${Math.round(e.seconds)}</itunes:duration>
        <itunes:episode>${number}</itunes:episode>
        `
      }
    }),
    // (optional) inject custom xml
    customData: `
    <language>en-us</language>
    <link>${import.meta.env.BASE_URL}</link>
    <itunes:author>${title}</itunes:author>
    <itunes:type></itunes:type>
    <itunes:owner>
      <itunes:name>${title}</itunes:name>
      <itunes:email>pod@runningsoftware.systems</itunes:email>
    </itunes:owner>
    <itunes:category text="Technology"/>
    <itunes:explicit>true</itunes:explicit>
    <itunes:image href="${image}"/>
    `,
  }); 
}
