const universitiesJSON = 'https://raw.githubusercontent.com/KnowQuestFeedback/university-domains-list/master/world_universities_and_domains.json';
exports.universitiesJSON = () => universitiesJSON;

exports.getUniversities = async (req, res) => {
  try {
    const response = await fetch(universitiesJSON);
    const jsonData = await response.json();
    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}

exports.searchUniversities = async (req, res) => {
  try {
    const response = await fetch(universitiesJSON);
    const universities = await response.json();
    const {country, name, name_contains, domain, limit, offset} = req.body;
    let filteredUniversities = universities;

    if (name && country) {
      filteredUniversities = universities.filter(uni => uni["name"].toLowerCase() === name.toLowerCase() && uni["country"].toLowerCase() === country.toLowerCase());
    } else if (name_contains && country) {
      filteredUniversities = universities.filter(uni => uni["name"].toLowerCase().includes(name_contains.toLowerCase()) && uni["country"].toLowerCase() === country.toLowerCase());
    } else if (name_contains) {
      filteredUniversities = universities.filter(uni => uni["name"].toLowerCase().includes(name_contains.toLowerCase()));
    } else if (name) {
      filteredUniversities = universities.filter(uni => uni["name"].toLowerCase() === name.toLowerCase());
    } else if (country) {
      filteredUniversities = universities.filter(uni => uni["country"].toLowerCase() === country.toLowerCase());
    } else if (domain) {
      filteredUniversities = universities.filter(uni => uni["domains"].includes(domain));
    }

    if (offset) {
      filteredUniversities = filteredUniversities.slice(parseInt(offset));
    }
    if (limit) {
      filteredUniversities = filteredUniversities.slice(0, parseInt(limit));
    }

    return res.json(filteredUniversities);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}
