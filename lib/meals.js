import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  console.log('meal title = ' + meal.title);
  meal.slug = slugify(meal.title, { lower: true });
  console.log('meal.slug = ' + meal.slug);
  console.log('meal.instructions = ' + meal.instructions);
  meal.instructions = xss(meal.instructions);
  console.log('meal.instructions after xss = ' + meal.instructions);
  console.log('meal.image.name = ' + meal.image);
  const extension = meal.image.name.split('.').pop();
  console.log('extension = ' + extension);
  const fileName = `${meal.slug}.${extension}`;
  console.log('filename (slug + extension) = ' + fileName);

  const stream = fs.createWriteStream(`public/images/${fileName}`);   // needs a path
  const bufferedImage = await meal.image.arrayBuffer();
  console.log('buffered image = ' + bufferedImage);
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
  INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);


}
