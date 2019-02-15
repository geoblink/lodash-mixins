import _, { ObjectIterator, NotVoid, Dictionary, NumericDictionary } from 'lodash'

export default mapNonNil

/**
 * Map function returning only non-nil elements.
 *
 * @param collection Collection to iterate over.
 * @param iteratee Function invoked per iteration.
 * @returns New mapped array.
 */
function mapNonNil<
  CollectionItem extends any,
  Collection extends (
    ArrayLike<CollectionItem | null | undefined> |
    Dictionary<CollectionItem | null | undefined> |
    NumericDictionary<CollectionItem | null | undefined> |
    null |
    undefined
  )
> (
  collection: Collection,
  iteratee: ObjectIterator<Collection, NotVoid>
) {
  return _.filter(_.map(collection, iteratee), isNotNil)

  function isNotNil (item: CollectionItem) {
    return !_.isNil(item)
  }
}
