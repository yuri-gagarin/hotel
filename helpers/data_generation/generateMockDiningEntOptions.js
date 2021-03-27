import faker from "faker";
import DiningEntertainmentModel from "../../models/DiningEntertainment";

/** 
 * Generates a specific number of mock DiningEntertainment Models
 * @param {number} numberToGenerate Number of models to generate. Optional (defaults to 5)
 */
export const generateMockDiningEntOptions = async (numberToGenerate) => {
  const totalNumber = numberToGenerate ? numberToGenerate : Math.ceil(Math.random() * 5);
  const totalMockModels = [];

  for (let i = 0; i < totalNumber; i++) {
    totalMockModels.push({
      live: false, 
      title: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      hours: "Sun - Thur: 8:00 - 21:00, Fri - Sat: 9:00 = 23:00",
      address: faker.address.streetAddress(),
      images: [],
      menuImages: [],
      createdAt: new Date(Date.now()),
      editedAt: new Date(Date.now())
    });
  }
  try {
    const result = await DiningEntertainmentModel.insertMany(totalMockModels);
    return result;
  } catch (error) {
    throw error;
  }
};

