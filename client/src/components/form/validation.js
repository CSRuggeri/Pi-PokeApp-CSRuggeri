
export default function validationPoke(input) {
  const errors = {};

  if (!input.name.trim()) {
    errors.name = "Name cannot be empty";
  } else if (!/^[A-Za-z]{1,10}$/.test(input.name)) {
    errors.name = "Name must contain 1 to 10 alphabetic characters";
  }

  if (!/^\d+$/.test(input.health) || input.health < 1 || input.health > 100) {
    errors.health = "Health must be a whole number between 1 and 100";
  }

  if (!/^\d+$/.test(input.speed) || input.speed < 1 || input.speed > 100) {
    errors.speed = "Speed must be a whole number between 1 and 100";
  }

  if (!/^\d+$/.test(input.attack) || input.attack < 1 || input.attack > 100) {
    errors.attack = "Attack must be a whole number between 1 and 100";
  }

  if (!/^\d+$/.test(input.defense) || input.defense < 1 || input.defense > 100) {
    errors.defense = "Defense must be a whole number between 1 and 100";
  }

  if (!/^\d+$/.test(input.height) || input.height < 1 || input.height > 100) {
    errors.height = "Height must be a whole number between 1 and 100";
  }

  if (!/^\d+$/.test(input.weight) || input.weight < 1 || input.weight > 100) {
    errors.weight = "Weight must be a whole number between 1 and 100";
  }

  if (input.types.length < 1 || input.types.length > 2) {
    errors.types = "Select exactly one or two types";
  }

  if (input.img && !/^https?:\/\/\S+$/.test(input.img)) {
    errors.img = "Invalid image URL";
  }

  return errors;
}