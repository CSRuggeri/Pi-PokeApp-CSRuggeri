

export default function validationPoke(input) {
  const errors = {};
  if (!/[A-Za-z]{3,}/.test(input.name)) {
    errors.name = "Invalid name";
  }
  if (!/^[0-9]+$/.test(input.health)) {
    errors.health = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.speed)) {
    errors.speed = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.attack)) {
    errors.attack = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.defense)) {
    errors.defense = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.height)) {
    errors.height = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.weight)) {
    errors.weight = "Invalid Number";
  }
  if(!input.types.length){
    errors.types = "Select at least one type"
  }
  if (input.img && !/^https?:\/\/\S+$/.test(input.img)) {
    errors.img = "Invalid image URL";
  }
  return errors;
}