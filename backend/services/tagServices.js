import TagSequelize from "../models/tag";

export async function createTag(input) {
  try {
    const tag = await TagSequelize.create({
      tagname: input.tagname,
      description: input.description,
    });
    return tag;
  } catch (e) {
    console.log(e)
  }

};