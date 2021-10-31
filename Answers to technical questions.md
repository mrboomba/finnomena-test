## How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I spend around 24 hours on this test. If I have more time I will using cached then network to tune performance up

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

For honestly I just start to learn Vue.js at the beginning of this test. So I don't know what is new on latest version but what I love in Vue.js is it very simple and clean. 

### Filters
I can create filter easier than I create directive in angular

<sub><sub>@/filters/formatDate.ts</sub></sub>
```
import { format } from "date-fns";

export function displayDate(date: Date) {
    return format(new Date(date), "dd MMM yyyy");
}
```
<sub><sub>@/filters/formatNumber.ts</sub></sub>
```
export function displayFloat(input: number) {
    return input.toFixed(2);
}
}
```
<sub><sub>@/components/FundRanking.vue</sub></sub>
```
filters: {
    displayDate,
    displayFloat,
  },
```
### Watch
And also I can observe data easier by just using watch

<sub><sub>@/components/FundRanking.vue</sub></sub>
```
watch: {
    range(newRange: string) {
      this.updatedData();
    },
  },
```


## How would you track down a performance issue in production? Have you ever had to do this?

I need to implement web application that user need to see data and information in 2 sec but I need to called api that use time around 3-4 sec to get data. So we use cache then network to store previous response in to IndexDB by using URL and body as a key.Then next time when we called api it will find ount in IndexDB first then show the old data with some app shell and then get data from backend in the background and when response is coming we check it that different from old data or not.If yes, we store data in to IndexDB and Update data on frontend.Else we just ignore it.

## How would you improve the FINNOMENA APIs that you just used?

1. Add a swagger for understanding the business value and reduce error from unknown area
2. Maybe add some authentication if these information have a value
3. Add rate limit for prevent DoS and DDoS