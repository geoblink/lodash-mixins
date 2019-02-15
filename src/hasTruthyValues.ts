import shortcuttedReduce from './shortcuttedReduce'

export default hasTruthyValues

/**
 * Returns whether given collection has at least one truthy value for one of its
 * keys.
 *
 * This function stops traversing the collection as soon as it finds a truthy
 * value.
 *
 * @param collection Collection to iterate over.
 * @returns `true` if there's at least one value which is truthy.
 */
function hasTruthyValues<Collection extends object> (collection: Collection): boolean {
  return shortcuttedReduce(
    collection,
    (accum, value) => accum || !!value,
    false
  )
}
