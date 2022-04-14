/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await Promise.all([
        knex.schema.hasTable('users').then((exists) => {
            if (!exists) {
                return knex.schema.createTable('users', (t) => {
                    t.increments().primary;// integer id
                    t.string('name');
                    t.string('email').unique();
                    t.string('password').notNullable();
                    t.string('pictureUrl');
                    t.string('location');
                    t.string('about');
                    t.timestamp('createdAt').defaultTo(knex.fn.now());
                    t.timestamp('lastSeen');
                    t.integer('userType');
                    t.integer('questionCount');
                    t.integer('answerCount');
                })
            }
        }),

        knex.schema.hasTable('tags').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('tags', (t) => {
                    t.increments().primary; // integer id
                    t.string('name').notNullable();
                    t.string('description');
                    t.integer('questionCount');
                    t.timestamp('createdAt').defaultTo(knex.fn.now());
                    t.timestamp('updatedAt').defaultTo(knex.fn.now());
                })
            }
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await Promise.all([
        await knex.schema.dropTableIfExists('users'),
        await knex.schema.dropTableIfExists('tags'),
    ]);
};
