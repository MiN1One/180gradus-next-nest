import { Query } from "mongoose";

const DEFAULT_LIMIT_COUNT = 10;
const featureQueryKeys = [
  'project',
  'page',
  'limit',
  'search',
  'sort',
  'populate'
];

export class ApiFeatures<DocumentType> {
  constructor(
    public mongooseQuery: Query<DocumentType[], DocumentType>,
    public requestQuery: Record<string, string>
  ) {}

  populate() {
    if (this.requestQuery.populate) {
      const fields = this.requestQuery.populate.split(',');
      this.mongooseQuery = this.mongooseQuery.populate(fields);
    }
    return this;
  }

  filter() {
    const queriesCopy = Object.assign({}, this.requestQuery);
    featureQueryKeys.forEach(key => delete queriesCopy[key]);

    this.mongooseQuery = this.mongooseQuery.find(queriesCopy);

    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const fields = this.requestQuery.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  project() {
    if (this.requestQuery.project) {
      const fields = this.requestQuery.project.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v -__t');
    }
    return this;
  }

  search() {
    if (this.requestQuery.search) {
      this.mongooseQuery = this.mongooseQuery.find({
        $text: {
          $search: this.requestQuery.search,
          $caseSensitive: false,
          $diacriticSensitive: false
        }
      });
    }
    return this;
  }

  limit() {
    this.mongooseQuery = this.mongooseQuery.limit(
      this.requestQuery.limit 
        ? parseInt(this.requestQuery.limit)
        : DEFAULT_LIMIT_COUNT
    );
    return this;
  }

  paginate() {
    if (this.requestQuery.page) {
      const limit = this.requestQuery.limit
        ? parseInt(this.requestQuery.limit, 10)
        : DEFAULT_LIMIT_COUNT;
        
      const page = parseInt(this.requestQuery.page, 10);
      const skip = page - 1 * limit;

      this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    }
    return this;
  }
}