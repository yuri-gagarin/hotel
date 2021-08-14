import faker from "faker";
import NewsPost from "../../models/NewsPost";

/** 
 * Generates a specific number of mock NewsPost Models
 * @param {number} numberOfPosts Number of posts to generate. Optional (defaults to 10)
 */
export const generateMockNewsPosts = async (numberOfPosts) => {
  const totalPosts = numberOfPosts ? numberOfPosts : 10;
  const newsPosts = [];
  for (let i = 0; i < totalPosts; i++) {
    newsPosts.push({
      title: faker.lorem.words(),
      createdBy: faker.name.firstName(),
      content: faker.lorem.sentences(Math.ceil(Math.random() * 5)),
      createdAt: new Date(Date.now()),
      editedAt: new Date(Date.now())
    });
  }
  try {
    const result = await NewsPost.insertMany(newsPosts);
    return result;
  } catch (error) {
    return false;
  }
};
