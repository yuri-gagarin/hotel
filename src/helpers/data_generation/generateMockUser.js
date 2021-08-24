import faker from "faker";
import User from "../../models/User";

const generateOneOrZero = () => {
  return Math.round(Math.random());
};
/** 
 * Generates a specific number of mock User Models
 * @param {number} numberOfusers Number of users to generate. Optional (defaults to 10)
 */
export const generateMockUsers = async (numberOfUsers) => {
  const totalUsers = numberOfUsers ? numberOfUsers : 10;
  const newsUsers = [];
  
  for (let i = 0; i < totalUsers; i++) {
    newsUsers.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "password",
      phoneNumber: faker.phone.phoneNumber(),
      role: generateOneOrZero() === 1 ? "owner" : "admin",
      confirmed: generateOneOrZero() === 1 ? true : false,
      createdAt: new Date(Date.now()),
      editedAt: new Date(Date.now())
    });
  }
  try {
    const result = await User.insertMany(newsUsers);
    return result;
  } catch (error) {
    return false;
  }
};
