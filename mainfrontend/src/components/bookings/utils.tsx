function calculatePrice(pricePerMonth, startDate, endDate) {
    const daysInMonth = 30; // Approximate number of days in a month
    const daysBooked = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const dailyPrice = pricePerMonth / daysInMonth;
    return dailyPrice * daysBooked;
  }
  