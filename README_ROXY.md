
Project Breakdown
------------------

Components: 
1. LapsTable
2. PeakPowers
3. RunSummary
4. LapsTable (has its own scss styling file (LapsTable.scss))

For this challenge, I mainly focused on the functionality rather than styling of the UI, and if I had more time that is something that I would have also significantly changed. 

Each different "feature" i.e. UserPreferences, RunSummary, LapsTable, PeakPowers, has its own component with its own functions in order to keep a lot more of the code local which gets the runData passed from the main `App` through props, which made it easier to read and debug. I generally like to minimise the length of individual functions because of readability and debug, which is why there are mutliple react components in the individual components. 

The only issue with this approach was that many of the components have similar or repeat calculation functions e.g. average distance, runtime etc and one of the things I would change is potentially add another non-component file that was responsible purely for these calculations.

LapsTable
--------

The rendering of the table is done based on the indices of the timestamps in the rest of the data structure. 
i.e. if you pressed lap at the first index of the timestamps list, then the pace, power and distance data will be associated with that lap at the first index as well.  

1. findTimeStampIndex(lappedTime, timestamps)
    Input: Array of the times that the person pressed `lapped`, timestamps that are associated with those `lapped times`
    @ returns an array of indices that correspond to the position of each lapped time in timestamp

    (There is an assumption here that if the person pressed lapped, there will be an equivalent timestamp index for that time)

2. findDistanceIndex(distance_list, mode)
    Similar to ^ - looks at distance_list rather than the time_stamp list
    @ return indices of distance positions based on km / m 

The table that is rendered is done using normal html tags, but if I had more time to spend on this I would have instead used react-table which allows you to be build `prettier` tables. 

PeakPowers
----------

In order to calculate the PeakPowers, I used a variation of the `maximum sum of subarray of size k algorithm` which has an O(n) run-time when you use the sliding window approach. The basis of this is that we first build an array from index 0 of `total_power_list` of k seconds, and then iterate through the array comparing the first value in the array to the next value. 

This approach was based on the fact that every element in the `total_power_list` is 1 second apart. However, I realised that the length of the `timestamp_list` is potentially smaller than the number of the seconds in the run. Therefore, to be able to use that algorithm above, I rewrote the power_list array so that if there was a difference between two consecutive timestamps greater than 1, you would add x many of the power-value for that time stamp, else you would just add the power-value for that timestamp. E.g. if there is one time stamp for 4:00:00pm and the next one is 4:00:05pm and the power value associated at 4:00:00 is 100 Watts, you add 5 100 to the new_power_list to reflect that the data is missing and we are using the assumption that the power of the runner remained the same during that time period. 

