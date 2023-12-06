import pandas as pd
import numpy as np

def find_roots(p):
    # If input is scalar, this makes it an array
    p = np.atleast_1d(p)
 
    if p.ndim != 1:
        raise ValueError("Input must be a rank-1 array.")

    # find non-zero array entries
    non_zero = np.nonzero(np.ravel(p))[0]
   
    # Return an empty array if the polynomial is all zeros
    if len(non_zero) == 0:
        return np.array([])
    
    # find the number of trailing zeros -- this is the number of roots at 0.
    trailing_zeros = len(p) - non_zero[-1] - 1

    # strip leading and trailing zeros
    p = p[int(non_zero[0]):int(non_zero[-1]) + 1]

    # casting: if incoming array isn't floating point, make it floating point.
    if not issubclass(p.dtype.type, (np.floating, np.complexfloating)):
        p = p.astype(float)
  
    N = len(p)
    print(p)
    
    if N > 1:
        # Calculate roots of the polynomial
        roots = np.roots(p)
        print("Roots:", roots)
    else:
        roots = np.array([])

    # tack any zeros onto the back of the array
    roots = np.hstack((roots, np.zeros(trailing_zeros, dtype=roots.dtype)))
   
    return roots

def calc_irr(values):
    res = find_roots(values[::-1])
    
    # Convert complex roots to an array of dictionaries
    roots_result = [{'real': root.real, 'imaginary': root.imag} for root in res]

    # Print roots
    # print("Roots:", roots_result)
    
    mask = (res.imag == 0) & (res.real > 0)

    if not mask.any():
        return np.nan
    
    res = res[mask].real
    rate = 1 / res - 1
    rate = rate.item(np.argmin(np.abs(rate)))
    return rate

def projection_graph(initialPayment, monthlyPayment, MonthlyPaymentPeriod, monthlyAllowance, MonthlyAllowancePeriod):
    sharpe_ratio = 1.0
    z = 0.05
    layer = 5
    cashFlows=[]
    cashFlows.append(initialPayment)
    for i in range(MonthlyPaymentPeriod):
        cashFlows.append(monthlyPayment)
    for i in range(MonthlyAllowancePeriod):
        cashFlows.append(-monthlyAllowance)
    # Calculate the IRR
    irr = calc_irr(cashFlows) # monthly IRR
    sigma=irr*sharpe_ratio
    irr_yearly = (1.0 + irr)**(12.0) - 1.0
    print("Internal rate of return:%3.4f"%irr_yearly)
    balance=[]
    for i in range(layer):
        balance.append(cashFlows.copy())
        for j in range(MonthlyPaymentPeriod+MonthlyAllowancePeriod):
            n = -layer + 2*i +1
            balance[i][j+1]=balance[i][j]*(1.0 + irr + n*z*sigma) + balance[i][j+1]
    df_balance= pd.DataFrame(data=balance)
    projection_graph(df_balance)
    df_balance.T.plot()

# Example usage
initialPayment = 100
monthlyPayment = 75
MonthlyPaymentPeriod = 240
monthlyAllowance = 6000
MonthlyAllowancePeriod = 5

projection_graph(initialPayment, monthlyPayment, MonthlyPaymentPeriod, monthlyAllowance, MonthlyAllowancePeriod)






# ############################3


# def find_roots(p):
#     # If input is scalar, this makes it an array
#     p = p if isinstance(p, (list, tuple)) else [p]

#     # find non-zero array entries
#     non_zero = next((i for i, coef in enumerate(p) if coef != 0), None)

#     # Return an empty array if the polynomial is all zeros
#     if non_zero is None:
#         return []

#     # find the number of trailing zeros -- this is the number of roots at 0.
#     trailing_zeros = len(p) - non_zero - 1

#     # strip leading and trailing zeros
#     p = p[non_zero:-(trailing_zeros or None)]

#     # casting: if incoming array isn't floating point, make it floating point.
#     if not all(isinstance(coef, (float, int)) for coef in p):
#         p = [float(coef) for coef in p]

#     N = len(p)

#     if N > 1:
#         # Calculate roots of the polynomial using a simple root-finding algorithm
#         roots = find_roots_simple(p)
#     else:
#         roots = []

#     # tack any zeros onto the back of the array
#     roots.extend([0] * trailing_zeros)
#     print("Roots:", roots)
#     return roots

# def find_roots_simple(p):
#     epsilon = 1e-9
#     max_iterations = 1000

#     def evaluate_polynomial(coefs, x):
#         return sum(coef * x**i for i, coef in enumerate(coefs))

#     def evaluate_derivative(coefs, x):
#         return sum(i * coef * x**(i-1) for i, coef in enumerate(coefs[1:], start=1))

#     def evaluate_derivative2(coefs, x):
#         return sum(i * (i-1) * coef * x**(i-2) for i, coef in enumerate(coefs[2:], start=2))

#     def newton_method(x0):
#         x = x0
#         iteration = 0

#         while iteration < max_iterations:
#             f = evaluate_polynomial(p, x)
#             f_prime = evaluate_derivative(p, x)
#             f_prime2 = evaluate_derivative2(p, x)

#             delta_x = f_prime / (f_prime**2 - f * f_prime2)  # Newton's method formula
#             x -= delta_x

#             if abs(delta_x) < epsilon:
#                 break

#             iteration += 1

#         return x

#     roots = []

#     # Try multiple initial guesses to find multiple roots
#     initial_guesses = [1.0, 1.0j, -1.0, -1.0j]

#     for x0 in initial_guesses:
#         root = newton_method(x0)
#         roots.append(root)

#         # Use synthetic division to reduce the polynomial
#         p = synthetic_division(p, root)

#     return roots

# def synthetic_division(p, root):
#     quotient = [0.0] * (len(p) - 1)
#     remainder = p[0]

#     for i in range(1, len(p)):
#         quotient[i-1] = remainder
#         remainder = root * remainder + p[i]

#     return quotient

# def calc_irr(values):
#     res = find_roots(values[::-1])

#     # Print roots
#     # print("Roots:", res)

#     # Filter out non-real roots
#     real_roots = [root for root in res if isinstance(root, (int, float))]

#     mask = [isinstance(root, float) and root > 0 for root in real_roots]

#     if not any(mask):
#         return float('nan')

#     res = [root for root, valid in zip(real_roots, mask) if valid]
#     rate = 1 / res - 1
#     rate = rate[rate.argmin()]

#     return rate

# def projection_graph(initialPayment, monthlyPayment, MonthlyPaymentPeriod, monthlyAllowance, MonthlyAllowancePeriod):
#     sharpe_ratio = 1.0
#     z = 0.05
#     layer = 5
#     cashFlows = [initialPayment]

#     for _ in range(MonthlyPaymentPeriod):
#         cashFlows.append(monthlyPayment)

#     for _ in range(MonthlyAllowancePeriod):
#         cashFlows.append(-monthlyAllowance)

#     # Calculate the IRR
#     irr = calc_irr(cashFlows)  # monthly IRR
#     sigma = irr * sharpe_ratio
#     irr_yearly = (1.0 + irr)**(12.0) - 1.0
#     print("Internal rate of return:%3.4f" % irr_yearly)
#     balance = []

#     for _ in range(layer):
#         balance.append(cashFlows.copy())

#         for j in range(MonthlyPaymentPeriod + MonthlyAllowancePeriod):
#             n = -layer + 2 * _ + 1
#             balance[_][j + 1] = balance[_][j] * (1.0 + irr + n * z * sigma) + balance[_][j + 1]

#     # df_balance = pd.DataFrame(data=balance)
#     # df_balance.T.plot()

# # Example usage
# initialPayment = 100
# monthlyPayment = 150
# MonthlyPaymentPeriod = 180
# monthlyAllowance = 2000
# MonthlyAllowancePeriod = 1

# projection_graph(initialPayment, monthlyPayment, MonthlyPaymentPeriod, monthlyAllowance, MonthlyAllowancePeriod)
