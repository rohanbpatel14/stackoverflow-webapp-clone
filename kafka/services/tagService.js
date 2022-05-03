import TagSequelize from "../models/tag";

export async function createTag(payload, cb) {
  const { tagname, description } = payload;
  try {
    const tag = await TagSequelize.create({
      tagname: tagname,
      description: description,
    });
    return cb(null, tag);
  } catch (e) {
    console.log(e)
    return cb(e, null);
  }
};

export async function getAllTags(cb) {
  try {
    const result = await TagSequelize.findAll({
      distinct: true,
      attributes: [
        'id',
        'tagname',
        'description',
        'questionCount',
      ],
    });
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}