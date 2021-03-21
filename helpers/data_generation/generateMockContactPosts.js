import faker from "faker";
import ContactPost from "../../models/ContactPost";

/** 
 * Generates a specific number of mock ContactPost Models
 * @param {number} numberOfPosts Number of posts to generate. Optional (defaults to 10)
 */
export const generateMockContactPosts = async (numberOfPosts) => {
  const totalPosts = numberOfPosts ? numberOfPosts : 10;
  const contactPosts = [];
  for (let i = 0; i < totalPosts; i++) {
    contactPosts.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      pnoneNumber: faker.phone.phoneNumber(),
      content: faker.lorem.sentences(Math.ceil(Math.random() * 5)),
      read: false,
      sentAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
      editedAt: new Date(Date.now())
    });
  }
  try {
    const result = await ContactPost.insertMany(contactPosts);
    return result;
  } catch (error) {
    throw error;
  }
};
