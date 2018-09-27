function transform2Array(regions, result) {
  /* const result = []

  function pushResult(value, result) {
    const { id, name } = value
    result.push({ id, name })
  }

  regions.forEach(region => {
    pushResult(region, result)
    region.city.forEach(city => {
      pushResult(city, result)
      city.area.forEach(area => {
        pushResult(area, result)
      })
    })
  }) */

  regions.forEach(region => {
    Object.keys(region).forEach(key => {
      if (Array.isArray(regions[key])) {
        transform2Array(regions[key], result)
      }

      const { id, name } = regions
      result.push({ id, name })
    })
  })

  return result
}
