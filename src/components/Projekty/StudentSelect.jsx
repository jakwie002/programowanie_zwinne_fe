const StudentSelect = ({ studenci, onChange }) => {
    const handleChange = (event) => {
      const selectedIds = new Set(event.target.value)
      const newStudenci = studenci.map(student => ({
        ...student,
        selected: selectedIds.has(student.studentId)
      }))
  
      onChange(newStudenci)
    }
  
    return (
      <select multiple value={studenci.filter(s => s.selected).map(s => s.studentId)} onChange={handleChange}>
        {studenci.map(student => (
          <option key={student.studentId} value={student.studentId}>
            {student.name} 
          </option>
        ))}
      </select>
    )
  }
  
  export default StudentSelect
  