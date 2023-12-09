// const addAddress = async (req, res) => {
//     try {
//       const { user_id, address, city, state, pin_code, phone_no } = req.body;
//       const user = req.user;
  
//       if (!user || user._id.toString() !== user_id) {
//         return res.status(401).json({ error: 'Invalid user or unauthorized action' });
//       }
  
//       const foundUser = await User.findById(user_id);
  
//       if (!foundUser) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       foundUser.addresses.push({ address, city, state, pin_code, phone_no });
//       await foundUser.save();
  
//       res.status(201).json({ message: 'Address added successfully', user: foundUser });
//     } catch (error) {
//       console.error('Error adding address:', error);
//       res.status(500).json({ error: 'Error adding address' });
//     }
//   };
  
  
//   // const getUserWithAddresses = async (req, res) => {
//   //   try {
//   //     const userId = req.params.id;
//   //     const user = await User.findById(userId).populate('addresses');
  
//   //     if (!user) {
//   //       return res.status(404).json({ error: 'User not found' });
//   //     }
  
//   //     res.json({ user });
//   //   } catch (error) {
//   //     console.error('Error fetching user with addresses:', error);
//   //     res.status(500).json({ error: 'Error fetching user with addresses' });
//   //   }
//   // };
//   const addAddress = async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { user_id, address, city, state, pin_code, phone_no } = req.body;
  
      
//       const access_token = req.headers.access_token; 
  
  
//       const user = await UserService.addAddress(
//         user_id,
//         address,
//         city,
//         state,
//         pin_code,
//         phone_no
//       );
  
//       res.status(201).json({ message: 'Address added successfully', user });
//     } catch (error) {
//       console.error('Error adding address:', error);
//       res.status(500).json({ error: 'Error adding address' });
//     }
//   };
//   // const getUserWithAddresses = async (req, res) => {
//   //   const userId = req.params.id;
  
//   //   try {
      
//   //     if (!mongoose.Types.ObjectId.isValid(userId)) {
//   //       return res.status(400).json({ error: 'Invalid user ID' });
//   //     }
  
//   //     const user = await User.findById(userId).populate('addresses');
  
//   //     if (!user) {
//   //       return res.status(404).json({ error: 'User not found' });
//   //     }
  
//   //     res.json({ user });
//   //   } catch (error) {
//   //     console.error('Error fetching user with addresses:', error);
//   //     res.status(500).json({ error: 'Error fetching user with addresses' });
//   //   }
//   // };
  
  