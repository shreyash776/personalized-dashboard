'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../features/store'
import { setCategories } from '../../features/user/userSlice'

const categoriesAvailable = ['technology', 'business', 'sports', 'science', 'health', 'entertainment']

export default function SettingsPage() {
  const selected = useSelector((state: RootState) => state.user.categories)
  const dispatch = useDispatch()

  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      dispatch(setCategories(selected.filter(c => c !== cat)))
    } else {
      dispatch(setCategories([...selected, cat]))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Content Preferences</h2>
      <div className="grid gap-2">
        {categoriesAvailable.map(cat => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-blue-600"
            />
            {cat[0].toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        Your dashboard will show news from your selected categories.
      </div>
    </div>
  )
}
