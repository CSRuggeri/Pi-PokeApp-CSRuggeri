
const { Type } = require('../db');

const createType = async (name) => {
  try {
    if (name !== undefined) {
      // Check if the type already exists
      const existingType = await Type.findOne({
        where: {
          name: name.toLowerCase(),
        },
      });

      if (existingType) {
        return { status: 400, result: { error: 'Type already exists' } };
      }

      // Create a new type
      const newType = await Type.create({
        name: name.toLowerCase(),
      });

      return { status: 201, result: newType };
    } else {
      // Handle the case where name is undefined
      console.error('Name is undefined');
      return { status: 400, result: { error: 'Name is required' } };
    }
  } catch (error) {
    console.error('Error creating type:', error);
    return { status: 500, result: { error: 'Internal Server Error' } };
  }
};

module.exports = createType;
